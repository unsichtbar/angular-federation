import { Component, computed, inject, signal } from '@angular/core';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { TOOL_VERSION } from './version';

interface Item {
  sku: string;
  name: string;
  category: 'Hardware' | 'Packaging' | 'Office';
  onHand: number;
  reorderAt: number;
}

const ITEMS: Item[] = [
  { sku: 'HW-104', name: 'Steel brackets', category: 'Hardware', onHand: 420, reorderAt: 200 },
  { sku: 'HW-221', name: 'M6 bolts (box)', category: 'Hardware', onHand: 35, reorderAt: 50 },
  { sku: 'PK-010', name: 'Shipping boxes, medium', category: 'Packaging', onHand: 1200, reorderAt: 500 },
  { sku: 'PK-033', name: 'Bubble wrap roll', category: 'Packaging', onHand: 12, reorderAt: 20 },
  { sku: 'OF-002', name: 'Printer paper (ream)', category: 'Office', onHand: 64, reorderAt: 40 },
  { sku: 'OF-019', name: 'Label printer tape', category: 'Office', onHand: 3, reorderAt: 10 },
];

@Component({
  selector: 'inv-stock-list',
  template: `
    <header>
      <h1>Inventory</h1>
      <span class="ver">v{{ version }}</span>
    </header>
    <div class="filters">
      <input type="search" placeholder="Search SKU or name" [value]="query()" (input)="query.set($any($event.target).value)" />
      <select (change)="category.set($any($event.target).value)">
        <option value="">All categories</option>
        @for (c of categories; track c) { <option [value]="c">{{ c }}</option> }
      </select>
      <label><input type="checkbox" (change)="lowOnly.set($any($event.target).checked)" /> Low stock only</label>
    </div>
    <table>
      <thead><tr><th>SKU</th><th>Item</th><th>Category</th><th class="num">On hand</th><th></th></tr></thead>
      <tbody>
        @for (item of visible(); track item.sku) {
          <tr [class.low]="item.onHand < item.reorderAt">
            <td>{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td class="num">{{ item.onHand }}</td>
            <td>
              @if (item.onHand < item.reorderAt) {
                <button (click)="reorder(item)">Reorder</button>
              }
            </td>
          </tr>
        } @empty {
          <tr><td colspan="5" class="empty">No items match.</td></tr>
        }
      </tbody>
    </table>
    <p class="summary">{{ lowCount() }} of {{ items.length }} items below reorder level</p>
  `,
  styles: `
    header { display: flex; align-items: baseline; gap: .75rem; }
    h1 { margin: 0 0 1rem; }
    .ver { font-size: .8rem; color: #64748b; background: #f1f5f9; padding: .1rem .5rem; border-radius: 99px; }
    .filters { display: flex; gap: .75rem; align-items: center; margin-bottom: 1rem; }
    input[type=search], select { padding: .45rem .6rem; border: 1px solid #cbd5e1; border-radius: 6px; font: inherit; }
    table { border-collapse: collapse; width: 100%; max-width: 820px; }
    th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #e2e8f0; }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    tr.low td { background: #fff7ed; }
    tr.low .num { color: #c2410c; font-weight: 600; }
    .empty { color: #64748b; text-align: center; }
    .summary { color: #64748b; }
    button { padding: .3rem .75rem; border-radius: 6px; border: 1px solid #fdba74; background: #fff; cursor: pointer; }
  `,
})
export class StockList {
  private readonly platform = inject(PLATFORM_CONTEXT);
  protected readonly version = TOOL_VERSION;
  protected readonly items = ITEMS;
  protected readonly categories = [...new Set(ITEMS.map((i) => i.category))];

  protected readonly query = signal('');
  protected readonly category = signal('');
  protected readonly lowOnly = signal(false);

  protected readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.items.filter(
      (i) =>
        (!q || i.sku.toLowerCase().includes(q) || i.name.toLowerCase().includes(q)) &&
        (!this.category() || i.category === this.category()) &&
        (!this.lowOnly() || i.onHand < i.reorderAt),
    );
  });
  protected readonly lowCount = computed(() => this.items.filter((i) => i.onHand < i.reorderAt).length);

  protected reorder(item: Item): void {
    this.platform.notify(`Reorder placed for ${item.name} (${item.sku})`);
  }
}
