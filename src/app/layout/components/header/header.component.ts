import { Component, inject, input, output } from '@angular/core';
import { AuthService } from '@auth/services';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;
  logOut() {
    this.authService.logOut();
  }
}
