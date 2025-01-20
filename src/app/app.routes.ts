import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'scan',
    loadComponent: () =>
      import('./pages/scan/scan.component').then(
        (m) => m.ScanComponent
      )
  },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./pages/view/view.component').then(
        (m) => m.ViewComponent
      )
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent
      )
  },
  {
    path: '',
    redirectTo: '/scan',
    pathMatch: 'full',
  }
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   canActivate: [notFoundRedirectGuard],
  //   loadComponent: () => import('./pages/not-found/not-found.component').then(
  //     (m) => m.NotFoundComponent
  //   ),
  // },
];
