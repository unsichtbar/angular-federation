import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { initials, PEOPLE } from './people.data';

@Component({
  selector: 'dir-detail',
  imports: [RouterLink],
  template: `
    <a routerLink="..">← Directory</a>
    @if (person(); as p) {
      <div class="head">
        <span class="avatar">{{ initials(p.name) }}</span>
        <div>
          <h1>{{ p.name }}</h1>
          <p>{{ p.role }}</p>
        </div>
      </div>
      <dl>
        <dt>Department</dt><dd>{{ p.department }}</dd>
        <dt>Location</dt><dd>{{ p.location }}</dd>
        <dt>Email</dt><dd>{{ p.email }}</dd>
      </dl>
      <button (click)="platform.notify('Copied ' + p.email)">Copy email</button>
    } @else {
      <p>No one with id {{ id() }}.</p>
    }
  `,
  styles: `
    .head { display: flex; gap: 1rem; align-items: center; margin: 1rem 0; }
    .head h1 { margin: 0; }
    .head p { margin: .2rem 0 0; color: #64748b; }
    .avatar { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; background: #e2e8f0; font-size: 1.4rem; font-weight: 600; }
    dl { display: grid; grid-template-columns: max-content 1fr; gap: .4rem 1.5rem; }
    dt { color: #64748b; }
    dd { margin: 0; }
    button { padding: .5rem 1rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; }
  `,
})
export class PersonDetail {
  readonly id = input.required<string>();
  protected readonly platform = inject(PLATFORM_CONTEXT);
  protected readonly initials = initials;
  protected readonly person = computed(() => PEOPLE.find((p) => p.id === this.id()));
}
