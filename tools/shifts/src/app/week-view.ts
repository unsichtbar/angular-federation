import { Component } from '@angular/core';
import { DAYS, ROTA } from './shifts.data';

@Component({
  selector: 'sh-week',
  template: `
    <table>
      <thead>
        <tr><th></th>@for (d of days; track d) { <th>{{ d }}</th> }</tr>
      </thead>
      <tbody>
        @for (person of people; track person) {
          <tr>
            <th>{{ person }}</th>
            @for (s of rota[person]; track $index) {
              <td><span class="shift" [class]="s.toLowerCase()">{{ s }}</span></td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    table { border-collapse: collapse; }
    th, td { padding: .4rem .5rem; text-align: center; border-bottom: 1px solid #f1f5f9; }
    tbody th { text-align: left; font-weight: 500; padding-right: 1rem; white-space: nowrap; }
    thead th { color: #64748b; font-weight: 500; }
    .shift { display: inline-block; width: 4rem; padding: .2rem 0; border-radius: 6px; font-size: .8rem; }
    .early { background: #fef9c3; color: #854d0e; }
    .late { background: #dbeafe; color: #1e40af; }
    .night { background: #ede9fe; color: #5b21b6; }
    .off { background: #f1f5f9; color: #94a3b8; }
  `,
})
export class WeekView {
  protected readonly days = DAYS;
  protected readonly rota = ROTA;
  protected readonly people = Object.keys(ROTA);
}
