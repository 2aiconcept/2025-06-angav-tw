import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services';
import { HeaderComponent, UiLayoutComponent } from '@layout/components';

@Component({
  selector: 'app-root',
  imports: [
    NgClass,
    UiLayoutComponent,
    HeaderComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tablayout = 'flex-column nav-pills';
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;
}
