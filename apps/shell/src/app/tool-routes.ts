import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { TOOL_ROUTES_EXPOSE } from '@poc/platform-sdk';
import { ToolUnavailable } from './tool-unavailable';
import { Home } from './home';
import { Workspace } from './registry';
import { WorkspaceLayout } from './workspace-layout';

/**
 * Loads a tool's exposed routes at runtime. A tool that is down or broken
 * renders an error panel instead of taking the shell with it.
 */
async function loadTool(remoteEntry: string): Promise<Routes> {
  try {
    const m = await loadRemoteModule<{ routes: Routes }>({
      remoteEntry,
      exposedModule: TOOL_ROUTES_EXPOSE,
    });
    return m.routes;
  } catch (err) {
    console.error(`Failed to load tool from ${remoteEntry}`, err);
    return [{ path: '**', component: ToolUnavailable, data: { remoteEntry } }];
  }
}

export function buildRoutes(workspaces: Workspace[]): Routes {
  return [
    { path: '', pathMatch: 'full', component: Home },
    ...workspaces.map((ws) => ({
      path: ws.id,
      component: WorkspaceLayout,
      data: { workspace: ws },
      children: [
        { path: '', pathMatch: 'full' as const, redirectTo: ws.tools[0]?.id ?? '/' },
        ...ws.tools.map((tool) => ({
          path: tool.id,
          title: `${tool.label} · ${ws.label}`,
          loadChildren: () => loadTool(tool.remoteEntry),
        })),
      ],
    })),
    { path: '**', redirectTo: '' },
  ];
}
