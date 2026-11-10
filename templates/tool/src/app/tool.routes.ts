import { Routes } from '@angular/router';

/**
 * The tool's public surface: the shell mounts these under
 * /<workspace>/__TOOL__. Keep all links relative so the tool works at any
 * mount point.
 */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./home').then((m) => m.Home) },
];
