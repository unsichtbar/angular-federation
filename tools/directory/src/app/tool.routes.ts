import { Routes } from '@angular/router';

/** Mounted by the shell under /<workspace>/directory. */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./people-list').then((m) => m.PeopleList) },
  { path: ':id', loadComponent: () => import('./person-detail').then((m) => m.PersonDetail) },
];
