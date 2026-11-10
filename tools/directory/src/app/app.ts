import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="banner">directory · standalone dev mode (no shell)</div>
    <main><router-outlet /></main>
  `,
  styles: `
    .banner { background: #fef3c7; color: #92400e; padding: .5rem 1rem; font-size: .85rem; }
    main { padding: 1.5rem 2rem; }
  `,
})
export class App {}
