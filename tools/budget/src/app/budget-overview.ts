import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { TOOL_VERSION } from './version';

interface Line {
  category: string;
  planned: number;
  spent: number;
}

@Component({
  selector: 'bud-overview',
  imports: [CurrencyPipe, PercentPipe],
  template: `
    <header>
      <h1>Budget</h1>
      <span class="ver">v{{ version }}</span>
    </header>
    <p class="ctx">Budget for {{ platform.workspace()?.businessArea }}</p>
    <div class="lines">
      @for (line of lines; track line.category) {
        <div class="line">
          <div class="label">
            <strong>{{ line.category }}</strong>
            <span>{{ line.spent | currency: 'EUR' : 'symbol' : '1.0-0' }} / {{ line.planned | currency: 'EUR' : 'symbol' : '1.0-0' }}</span>
          </div>
          <div class="bar"><div [style.width.%]="(line.spent / line.planned) * 100" [class.over]="line.spent > line.planned"></div></div>
          <small>{{ line.spent / line.planned | percent }}</small>
        </div>
      }
    </div>
    <button (click)="platform.notify('Budget change requested by ' + platform.user().name)">Request change</button>
  `,
  styles: `
    header { display: flex; align-items: baseline; gap: .75rem; }
    h1 { margin: 0; }
    .ver { font-size: .8rem; color: #64748b; background: #f1f5f9; padding: .1rem .5rem; border-radius: 99px; }
    .ctx { color: #64748b; }
    .lines { display: grid; gap: 1rem; max-width: 560px; margin-bottom: 1.5rem; }
    .label { display: flex; justify-content: space-between; margin-bottom: .25rem; }
    .label span { color: #64748b; font-size: .9rem; }
    .bar { height: 8px; background: #e2e8f0; border-radius: 99px; overflow: hidden; }
    .bar div { height: 100%; max-width: 100%; background: #3b82f6; }
    .bar div.over { background: #ef4444; }
    small { color: #64748b; }
    button { padding: .5rem 1rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; }
  `,
})
export class BudgetOverview {
  protected readonly platform = inject(PLATFORM_CONTEXT);
  protected readonly version = TOOL_VERSION;
  protected readonly lines: Line[] = [
    { category: 'Personnel', planned: 120000, spent: 86000 },
    { category: 'Software', planned: 24000, spent: 26500 },
    { category: 'Travel', planned: 15000, spent: 4200 },
  ];
}
