import { Route } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Route[] = [
  {
    path: '',
    component: NotFoundPageComponent,
  },
];
