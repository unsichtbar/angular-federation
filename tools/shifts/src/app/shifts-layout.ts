import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SWAP_REQUESTS } from './shifts.data';
import { TOOL_VERSION } from './version';

@Component({
  selector: 'sh-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <h1>Shift Planner</h1>
      <span class="ver">v{{ version }}</span>
    </header>
    <nav>
      <a routerLink="week" routerLinkActive="active">This week</a>
      <a routerLink="requests" routerLinkActive="active">
        Swap requests
        @if (pending()) { <span class="badge">{{ pending() }}</span> }
      </a>
    </nav>
    <router-outlet />
  `,
  styles: `
    header { display: flex; align-items: baseline; gap: .75rem; }
    h1 { margin: 0 0 1rem; }
    .ver { font-size: .8rem; color: #64748b; background: #f1f5f9; padding: .1rem .5rem; border-radius: 99px; }
    nav { display: flex; gap: .25rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 1.25rem; }
    nav a { padding: .5rem .9rem; color: #475569; text-decoration: none; border-bottom: 2px solid transparent; margin-bottom: -1px; }
    nav a.active { color: #0f172a; border-color: #3b82f6; }
    .badge { background: #3b82f6; color: #fff; border-radius: 99px; padding: 0 .45rem; font-size: .75rem; margin-left: .25rem; }
  `,
})
export class ShiftsLayout {
  protected readonly version = TOOL_VERSION;
  protected readonly pending = computed(() => SWAP_REQUESTS().filter((r) => r.status === 'pending').length);
}
