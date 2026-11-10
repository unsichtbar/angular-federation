import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

/**
 * Native Federation's `requiredVersion: 'auto'` copies the raw specifier from
 * package.json into remoteEntry.json. With pnpm catalogs and workspace
 * packages, that would be "catalog:" or "workspace:*", which the runtime
 * cannot compare. This rewrites them to real semver ranges so mismatched
 * singletons are still detected.
 */
const workspace = parse(
  readFileSync(new URL('./pnpm-workspace.yaml', import.meta.url), 'utf8'),
);

function catalogRange(spec, pkg) {
  const name = spec.slice('catalog:'.length) || 'default';
  const catalog = name === 'default' ? workspace.catalog : workspace.catalogs?.[name];
  const range = catalog?.[pkg];
  if (!range) throw new Error(`No ${pkg} in pnpm catalog "${name}"`);
  return range;
}

/** '@angular/core/rxjs-interop' -> '@angular/core', 'rxjs/operators' -> 'rxjs' */
function packageName(key) {
  const parts = key.split('/');
  return key.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

/** Version of a package as installed for the app being built (cwd). */
function installedVersion(pkg) {
  const file = join(process.cwd(), 'node_modules', pkg, 'package.json');
  return JSON.parse(readFileSync(file, 'utf8')).version;
}

export function resolveSharedVersions(shared) {
  for (const [key, cfg] of Object.entries(shared)) {
    const spec = cfg.requiredVersion;
    if (typeof spec !== 'string') continue;
    if (spec.startsWith('catalog:')) {
      cfg.requiredVersion = catalogRange(spec, packageName(key));
    } else if (spec.startsWith('workspace:')) {
      // Workspace packages: require the installed major (e.g. ^1.0.0).
      cfg.requiredVersion = `^${installedVersion(packageName(key))}`;
    }
  }
  return shared;
}
