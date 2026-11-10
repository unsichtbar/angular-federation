import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { initials, PEOPLE } from './people.data';
import { TOOL_VERSION } from './version';

@Component({
  selector: 'dir-list',
  imports: [RouterLink],
  template: `
    <header>
      <h1>People Directory</h1>
      <span class="ver">v{{ version }}</span>
    </header>
    <input type="search" placeholder="Search name, role, department or city" (input)="query.set($any($event.target).value)" />
    <div class="grid">
      @for (p of visible(); track p.id) {
        <a class="card" [routerLink]="p.id" [class.me]="p.id === platform.user().id">
          <span class="avatar">{{ initials(p.name) }}</span>
          <span>
            <strong>{{ p.name }}</strong>
            @if (p.id === platform.user().id) { <em>you</em> }
            <small>{{ p.role }} · {{ p.department }}</small>
          </span>
        </a>
      } @empty {
        <p class="empty">Nobody matches "{{ query() }}".</p>
      }
    </div>
  `,
  styles: `
    header { display: flex; align-items: baseline; gap: .75rem; }
    h1 { margin: 0 0 1rem; }
    .ver { font-size: .8rem; color: #64748b; background: #f1f5f9; padding: .1rem .5rem; border-radius: 99px; }
    input { width: 100%; max-width: 420px; padding: .5rem .7rem; border: 1px solid #cbd5e1; border-radius: 6px; font: inherit; margin-bottom: 1rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: .75rem; }
    .card { display: flex; gap: .75rem; align-items: center; padding: .9rem; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: inherit; }
    .card:hover { border-color: #94a3b8; }
    .card.me { border-color: #93c5fd; background: #eff6ff; }
    .avatar { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: #e2e8f0; font-weight: 600; flex-shrink: 0; }
    small { display: block; color: #64748b; }
    em { font-size: .75rem; color: #2563eb; margin-left: .35rem; font-style: normal; }
    .empty { color: #64748b; }
  `,
})
export class PeopleList {
  protected readonly platform = inject(PLATFORM_CONTEXT);
  protected readonly version = TOOL_VERSION;
  protected readonly initials = initials;
  protected readonly query = signal('');
  protected readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return PEOPLE.filter((p) =>
      [p.name, p.role, p.department, p.location].some((f) => f.toLowerCase().includes(q)),
    );
  });
}
