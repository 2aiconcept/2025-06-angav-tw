import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { AuthService } from '@auth/services';
import { SignalDataService } from '@dashboard/services';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  signalService = inject(SignalDataService);
  numVersion = this.signalService.version;
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;
  user = this.authService.user;
  logOut() {
    this.authService.logout();
  }
}
