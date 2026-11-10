import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ShellPlatformContext } from './platform-context';
import { WorkspaceRegistry } from './registry';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <a routerLink="/" class="brand">Platform</a>
      <nav>
        @for (ws of registry.workspaces(); track ws.id) {
          <a [routerLink]="['/', ws.id]" routerLinkActive="active">{{ ws.label }}</a>
        }
      </nav>
      <span class="user">{{ platform.user().name }}</span>
    </header>
    <main><router-outlet /></main>
    <div class="toasts">
      @for (t of platform.toasts(); track t.id) {
        <div class="toast">{{ t.message }}</div>
      }
    </div>
  `,
  styles: `
    :host { display: flex; flex-direction: column; min-height: 100vh; }
    .topbar { display: flex; align-items: center; gap: 1.5rem; padding: 0 1.25rem; height: 52px; background: #1e293b; color: #fff; }
    .brand { font-weight: 700; color: #fff; text-decoration: none; }
    nav { display: flex; gap: .25rem; flex: 1; }
    nav a { color: #cbd5e1; text-decoration: none; padding: .4rem .75rem; border-radius: 6px; }
    nav a.active { background: #334155; color: #fff; }
    .user { color: #94a3b8; font-size: .9rem; }
    main { flex: 1; display: flex; }
    .toasts { position: fixed; bottom: 1rem; right: 1rem; display: grid; gap: .5rem; }
    .toast { background: #0f172a; color: #fff; padding: .6rem 1rem; border-radius: 6px; box-shadow: 0 4px 12px #0003; }
  `,
})
export class App {
  protected readonly registry = inject(WorkspaceRegistry);
  protected readonly platform = inject(ShellPlatformContext);
}
