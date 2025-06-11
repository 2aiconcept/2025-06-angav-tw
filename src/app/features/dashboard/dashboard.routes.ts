import { Route } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ObservablesDemoPageComponent } from './pages/observables-demo-page/observables-demo-page.component';
import { SignalsDemoPageComponent } from './pages/signals-demo-page/signals-demo-page.component';

export const routes: Route[] = [
  {
    path: '',
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
];
