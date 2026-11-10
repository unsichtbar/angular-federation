import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { INVOICES } from './invoices.data';

@Component({
  selector: 'inv-detail',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <a routerLink="..">← All invoices</a>
    @if (invoice(); as inv) {
      <h1>{{ inv.id }}</h1>
      <dl>
        <dt>Customer</dt><dd>{{ inv.customer }}</dd>
        <dt>Amount</dt><dd>{{ inv.amount | currency: 'EUR' }}</dd>
        <dt>Status</dt><dd>{{ inv.status }}</dd>
      </dl>
      <button (click)="platform.notify('Reminder sent for ' + inv.id)">Send reminder</button>
    } @else {
      <p>Invoice {{ id() }} not found.</p>
    }
  `,
  styles: `
    dl { display: grid; grid-template-columns: max-content 1fr; gap: .4rem 1.5rem; }
    dt { color: #64748b; }
    dd { margin: 0; }
    button { padding: .5rem 1rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; }
  `,
})
export class InvoiceDetail {
  readonly id = input.required<string>();
  protected readonly platform = inject(PLATFORM_CONTEXT);
  protected readonly invoice = computed(() => INVOICES.find((i) => i.id === this.id()));
}
