import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services';
import { SignalDataService } from '@dashboard/services';
import { HeaderComponent, UiLayoutComponent } from '@layout/components';
import { NavComponent } from '@shared/components/nav/nav.component';
import { INavLink } from '@shared/interfaces';

@Component({
  selector: 'app-root',
  imports: [UiLayoutComponent, HeaderComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  authService = inject(AuthService);
  signalService = inject(SignalDataService);
  isLoggedIn = this.authService.isLoggedIn;
  numVersion = this.signalService.version;
  navItems: INavLink[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
    },
    {
      label: 'Orders',
      route: '/orders',
    },
  ];
  tablayout = 'flex-column nav-pills';
}
