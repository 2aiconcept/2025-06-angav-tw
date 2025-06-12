import { Routes } from '@angular/router';
import { SigninPageComponent } from './features/auth/pages/signin-page/signin-page.component';
import { SignupPageComponent } from './features/auth/pages/signup-page/signup-page.component';
import { authRoutes } from '@auth/auth.routes';
import { authGuard } from '@auth/guards';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  ...authRoutes,
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.routes').then((m) => m.routes),
  },
];
