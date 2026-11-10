import { Routes } from '@angular/router';

/**
 * Mounted by the shell under /<workspace>/shifts. The tool owns its own
 * nested routes (tabs); the shell knows nothing about them.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shifts-layout').then((m) => m.ShiftsLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'week' },
      { path: 'week', loadComponent: () => import('./week-view').then((m) => m.WeekView) },
      { path: 'requests', loadComponent: () => import('./swap-requests').then((m) => m.SwapRequests) },
    ],
  },
];
