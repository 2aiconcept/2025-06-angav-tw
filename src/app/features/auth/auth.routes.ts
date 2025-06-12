import { Route } from '@angular/router';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { guestGuard } from './guards/guest.guard';

export const authRoutes: Route[] = [
  {
    path: 'signin',
    component: SigninPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [guestGuard],
  },
];
