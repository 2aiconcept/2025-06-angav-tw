import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginCredentials } from '@auth/interfaces';
import { AuthService } from '@auth/services';

@Component({
  selector: 'app-signin-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninPageComponent {
  form!: FormGroup;
  isLoading = false;
  loginError = '';
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.loginError = '';

      const signinData: LoginCredentials = this.form.value;
      this.authService.signin(signinData).subscribe({
        next: () => {
          this.isLoading = false;
          // Navigation automatique via handleAuthSuccess
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError =
            error.message || "Une erreur est survenue lors de l'inscription";
        },
      });
    }
  }
}
