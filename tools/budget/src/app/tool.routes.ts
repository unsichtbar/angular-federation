import { Routes } from '@angular/router';

/** The tool's public surface: the shell mounts these under /<workspace>/budget. */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./budget-overview').then((m) => m.BudgetOverview) },
];
