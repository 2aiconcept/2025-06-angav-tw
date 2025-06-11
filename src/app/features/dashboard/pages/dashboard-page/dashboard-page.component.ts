import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from '@shared/components/nav/nav.component';
import { INavLink } from '@shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  tablayout = 'nav-tabs';
  navItems: INavLink[] = [
    {
      label: 'Observables',
      route: 'observables',
    },
    {
      label: 'Signals',
      route: 'signals',
    },
  ];
}
