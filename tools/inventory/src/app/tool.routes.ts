import { Routes } from '@angular/router';

/** Mounted by the shell under /<workspace>/inventory. */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./stock-list').then((m) => m.StockList) },
];
