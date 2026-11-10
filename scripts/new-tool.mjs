#!/usr/bin/env node
// Scaffold a new tool from templates/tool.
//
//   pnpm new-tool <id> <port> "<Title>"
//   pnpm new-tool inventory 4203 "Inventory"
//
// The tool is a standalone Angular app with Native Federation, exposing
// ./routes. Registering it in a workspace is a separate step (see output).
import { cpSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [id, port, title] = process.argv.slice(2);
if (!id || !/^[a-z][a-z0-9-]*$/.test(id) || !/^\d+$/.test(port ?? '') || !title) {
  console.error('Usage: pnpm new-tool <id> <port> "<Title>"   (id: lowercase kebab-case)');
  process.exit(1);
}

const root = new URL('..', import.meta.url).pathname;
const target = join(root, 'tools', id);
if (existsSync(target)) {
  console.error(`tools/${id} already exists`);
  process.exit(1);
}

cpSync(join(root, 'templates/tool'), target, { recursive: true });

const textFile = /\.(json|mjs|ts|html|css|md)$|^\.[a-z]+rc$|^\.editorconfig$|^\.gitignore$/;
(function replaceIn(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) replaceIn(path);
    else if (textFile.test(name)) {
      const src = readFileSync(path, 'utf8');
      const out = src
        .replaceAll('__TOOL__', id)
        .replaceAll('__PORT__', port)
        .replaceAll('__TITLE__', title);
      if (out !== src) writeFileSync(path, out);
    }
  }
})(target);

console.log(`Created tools/${id}. Next:

  pnpm install
  pnpm --filter @poc/${id} start        # standalone on http://localhost:${port}

Then add it to a workspace in apps/shell/public/registry.json:

  { "id": "${id}", "label": "${title}", "team": "<team>", "remoteEntry": "http://localhost:${port}/remoteEntry.json" }
`);
