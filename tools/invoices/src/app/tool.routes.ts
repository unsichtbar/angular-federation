import { Routes } from '@angular/router';

/**
 * The tool's public surface: the shell mounts these under
 * /<workspace>/invoices. Keep all links relative so the tool works at any
 * mount point.
 */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./invoice-list').then((m) => m.InvoiceList) },
  { path: ':id', loadComponent: () => import('./invoice-detail').then((m) => m.InvoiceDetail) },
];
