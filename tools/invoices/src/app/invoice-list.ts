import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { INVOICES } from './invoices.data';
import { TOOL_VERSION } from './version';

@Component({
  selector: 'inv-list',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <header>
      <h1>Invoices</h1>
      <span class="ver">v{{ version }}</span>
    </header>
    <p class="ctx">
      Signed in as {{ platform.user().name }} · workspace {{ platform.workspace()?.label }}
    </p>
    <table>
      <thead><tr><th>Invoice</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody>
        @for (inv of invoices; track inv.id) {
          <tr>
            <td><a [routerLink]="inv.id">{{ inv.id }}</a></td>
            <td>{{ inv.customer }}</td>
            <td>{{ inv.amount | currency: 'EUR' }}</td>
            <td><span class="status" [class]="inv.status">{{ inv.status }}</span></td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    header { display: flex; align-items: baseline; gap: .75rem; }
    h1 { margin: 0; }
    .ver { font-size: .8rem; color: #64748b; background: #f1f5f9; padding: .1rem .5rem; border-radius: 99px; }
    .ctx { color: #64748b; }
    table { border-collapse: collapse; width: 100%; max-width: 720px; }
    th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #e2e8f0; }
    .status { font-size: .8rem; padding: .1rem .5rem; border-radius: 99px; }
    .paid { background: #dcfce7; color: #166534; }
    .open { background: #e0f2fe; color: #075985; }
    .overdue { background: #fee2e2; color: #991b1b; }
  `,
})
export class InvoiceList {
  protected readonly platform = inject(PLATFORM_CONTEXT);
  protected readonly invoices = INVOICES;
  protected readonly version = TOOL_VERSION;
}
