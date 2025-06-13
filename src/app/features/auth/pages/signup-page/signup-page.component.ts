// signup-page.component.ts
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterData } from '@auth/interfaces';
import { AuthActions } from '@auth/store';
import { AuthFacade } from '@auth/store/auth.facade';
import { selectAuthError, selectAuthLoading } from '@auth/store/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  private facade = inject(AuthFacade);
  form!: FormGroup;
  isLoading$ = this.facade.isLoading$;
  signupError$ = this.facade.error$;

  private fb = inject(FormBuilder);

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
      const registerData: RegisterData = this.form.value;
      this.facade.register(registerData);
    }
  }
}
