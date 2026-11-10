import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface ToolEntry {
  id: string;
  label: string;
  team: string;
  remoteEntry: string;
}

export interface Workspace {
  id: string;
  label: string;
  businessArea: string;
  tools: ToolEntry[];
}

interface Registry {
  workspaces: Workspace[];
}

/**
 * Workspaces are data, not code. Adding a tool to a workspace means editing
 * the registry; the shell is not rebuilt.
 */
@Injectable({ providedIn: 'root' })
export class WorkspaceRegistry {
  private readonly http = inject(HttpClient);
  readonly workspaces = signal<Workspace[]>([]);

  async load(): Promise<Workspace[]> {
    const registry = await firstValueFrom(this.http.get<Registry>('registry.json'));
    this.workspaces.set(registry.workspaces);
    return registry.workspaces;
  }
}
