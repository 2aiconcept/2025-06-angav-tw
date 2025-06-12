// signup-page.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterData } from '@auth/interfaces';
import { AuthService } from '@auth/services';

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  form!: FormGroup;
  isLoading = false;
  signupError = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get username() {
    return this.form.get('username');
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
      this.signupError = '';

      const signupData: RegisterData = this.form.value;
      this.authService.signup(signupData).subscribe({
        next: () => {
          this.isLoading = false;
          // Navigation automatique via handleAuthSuccess
        },
        error: (error) => {
          this.isLoading = false;
          this.signupError =
            error.message || "Une erreur est survenue lors de l'inscription";
        },
      });
    }
  }
}
