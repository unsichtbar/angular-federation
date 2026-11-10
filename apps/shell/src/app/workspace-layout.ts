import { Component, effect, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ShellPlatformContext } from './platform-context';
import { Workspace } from './registry';

@Component({
  selector: 'app-workspace-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <aside>
      <small>{{ workspace().businessArea }}</small>
      <h2>{{ workspace().label }}</h2>
      @for (tool of workspace().tools; track tool.id) {
        <a [routerLink]="tool.id" routerLinkActive="active">
          {{ tool.label }}
          <span>{{ tool.team }}</span>
        </a>
      }
    </aside>
    <section><router-outlet /></section>
  `,
  styles: `
    :host { display: flex; flex: 1; }
    aside { width: 220px; padding: 1.25rem; border-right: 1px solid #e2e8f0; background: #f8fafc; }
    aside small { color: #64748b; text-transform: uppercase; letter-spacing: .05em; }
    aside h2 { margin: .25rem 0 1rem; font-size: 1.1rem; }
    aside a { display: block; padding: .5rem .75rem; border-radius: 6px; color: inherit; text-decoration: none; }
    aside a span { display: block; font-size: .75rem; color: #94a3b8; }
    aside a.active { background: #e2e8f0; }
    section { flex: 1; padding: 1.5rem 2rem; }
  `,
})
export class WorkspaceLayout {
  readonly workspace = input.required<Workspace>();
  private readonly platform = inject(ShellPlatformContext);

  constructor() {
    effect(() => {
      const { id, label, businessArea } = this.workspace();
      this.platform.workspace.set({ id, label, businessArea });
    });
  }
}
