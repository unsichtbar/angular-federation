import { Component, inject } from '@angular/core';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { SWAP_REQUESTS, SwapRequest } from './shifts.data';

@Component({
  selector: 'sh-requests',
  template: `
    <ul>
      @for (r of requests(); track r.id) {
        <li>
          <span><strong>{{ r.from }}</strong> → {{ r.to }} on {{ r.day }}</span>
          @if (r.status === 'pending') {
            <span class="actions">
              <button (click)="decide(r, 'approved')">Approve</button>
              <button (click)="decide(r, 'declined')">Decline</button>
            </span>
          } @else {
            <span class="status" [class]="r.status">{{ r.status }}</span>
          }
        </li>
      }
    </ul>
  `,
  styles: `
    ul { list-style: none; padding: 0; max-width: 560px; }
    li { display: flex; justify-content: space-between; align-items: center; padding: .7rem 0; border-bottom: 1px solid #e2e8f0; }
    .actions { display: flex; gap: .5rem; }
    button { padding: .3rem .75rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; }
    .status { font-size: .8rem; padding: .1rem .5rem; border-radius: 99px; }
    .approved { background: #dcfce7; color: #166534; }
    .declined { background: #fee2e2; color: #991b1b; }
  `,
})
export class SwapRequests {
  private readonly platform = inject(PLATFORM_CONTEXT);
  protected readonly requests = SWAP_REQUESTS;

  protected decide(r: SwapRequest, status: 'approved' | 'declined'): void {
    SWAP_REQUESTS.update((all) => all.map((x) => (x.id === r.id ? { ...x, status } : x)));
    this.platform.notify(`Swap ${status}: ${r.from} → ${r.to} (${r.day})`);
  }
}
