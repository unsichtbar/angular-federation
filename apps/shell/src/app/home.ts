import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkspaceRegistry } from './registry';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Workspaces</h1>
      <div class="grid">
        @for (ws of registry.workspaces(); track ws.id) {
          <a class="card" [routerLink]="['/', ws.id]">
            <small>{{ ws.businessArea }}</small>
            <h2>{{ ws.label }}</h2>
            <p>{{ ws.tools.length }} tools</p>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    section { padding: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
    .card { display: block; padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: inherit; }
    .card:hover { border-color: #94a3b8; }
    small { color: #64748b; text-transform: uppercase; letter-spacing: .05em; }
    h2 { margin: .25rem 0; }
    p { margin: 0; color: #64748b; }
  `,
})
export class Home {
  protected readonly registry = inject(WorkspaceRegistry);
}
