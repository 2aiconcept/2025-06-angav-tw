import { Routes } from '@angular/router';
import { SigninPageComponent } from './features/auth/pages/signin-page/signin-page.component';
import { SignupPageComponent } from './features/auth/pages/signup-page/signup-page.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { ObservablesDemoPageComponent } from './features/dashboard/pages/observables-demo-page/observables-demo-page.component';
import { SignalsDemoPageComponent } from './features/dashboard/pages/signals-demo-page/signals-demo-page.component';
import { OrderListPageComponent } from './features/orders/pages/order-list-page/order-list-page.component';
import { OrderAddPageComponent } from './features/orders/pages/order-add-page/order-add-page.component';
import { OrderEditPageComponent } from './features/orders/pages/order-edit-page/order-edit-page.component';
import { NotFoundPageComponent } from './features/not-found/pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      {
        path: 'observables',
        component: ObservablesDemoPageComponent,
      },
      {
        path: 'signals',
        component: SignalsDemoPageComponent,
      },
    ],
  },
  {
    path: 'orders',
    component: OrderListPageComponent,
  },
  {
    path: 'orders/add',
    component: OrderAddPageComponent,
  },
  {
    path: 'orders/edit/:id',
    component: OrderEditPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
