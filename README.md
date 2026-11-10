<img src="assets/icon.svg" width="64" height="64" alt="">

# angular-multi-app

A proof of concept for independently released Angular tools grouped into
workspaces, built with [Native Federation](https://native-federation.com).

## The model

| Concept | Here |
|---|---|
| **Tool** | A separately built and deployed Angular app (a federation *remote*). It exposes one thing: `./routes`. |
| **Team** | Owns one or more tools. Nothing in a tool imports from another tool. |
| **Workspace** | Data, not code: an entry in [`apps/shell/public/registry.json`](apps/shell/public/registry.json) listing tools and the URL each one is deployed at. |
| **Business area** | A field on the workspace. |
| **Shell** | The host. Owns the layout, user and workspace navigation. It has no build-time knowledge of any tool. |

At startup the shell reads `registry.json` and generates routes for each
workspace and tool. When a user opens a tool, the shell fetches that tool's
`remoteEntry.json` and mounts its routes under `/<workspace>/<tool>`.
Releasing a tool means deploying its static files. Neither the shell nor the
other tools are rebuilt.

```
apps/shell            host app, workspace registry, platform context
tools/invoices        "Team Ledger" tool, port 4201
tools/budget          "Team Forecast" tool, port 4202 (used in two workspaces)
libs/platform-sdk     the shell <-> tool contract
```

## The contract

`@poc/platform-sdk` is the only thing tools and the shell share besides
Angular itself. It defines a `PLATFORM_CONTEXT` injection token (current
user, current workspace, `notify()`). The shell provides it and tools inject it.
The package is shared as a federation singleton, so the token is the same
object in every bundle.

A tool must:

- expose `./routes` from `federation.config.mjs`
- use relative router links only, since it can be mounted at any path
- not rely on providers beyond `PLATFORM_CONTEXT` and the router

Each tool also runs on its own (`pnpm start` inside the tool) with a stub
platform context, so the owning team can work on it without the shell.

## Running it

```sh
pnpm install
pnpm dev        # shell :4200, invoices :4201, budget :4202
```

Open <http://localhost:4200>. The *Operations Planning* workspace includes a
tool registered at a URL where nothing is deployed. It shows an error panel and
the rest of the shell keeps working.

To see an independent release, build everything with `pnpm build` and serve
each `dist/*/browser` folder on its port (any static server with CORS enabled).
Then change `tools/budget/src/app/version.ts`, run `pnpm build` in
`tools/budget` only, and reload the shell. It shows the new version, and the
shell's build output is unchanged.

## Trade-offs

- **Angular versions move together.** Angular, RxJS and the SDK are shared as
  singletons with `strictVersion`, so all tools need compatible versions.
  Upgrading Angular is a coordinated, platform-wide release. If teams must be
  free to choose their own version, wrap tools as Web Components (Angular
  Elements) instead, at the cost of bigger bundles and a looser integration.
- **The SDK is a public API.** Breaking changes to it affect every tool. Keep
  it small and version it deliberately.
- **This is one repo for convenience.** Each app has its own `package.json` and
  build, so splitting them into per-team repos only requires publishing
  `@poc/platform-sdk` to a registry.

## Not covered by the POC

Real auth, the registry as a service (per-user or per-area workspaces),
per-tool CI/CD pipelines, cache busting of `remoteEntry.json` in production,
and shared design-system styling.
