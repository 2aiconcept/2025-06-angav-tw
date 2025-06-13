import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginCredentials } from '@auth/interfaces';
import { AuthActions } from '@auth/store';
import { selectAuthError, selectAuthLoading } from '@auth/store/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signin-page',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninPageComponent {
  private store = inject(Store);
  form!: FormGroup;
  isLoading$ = this.store.select(selectAuthLoading);
  loginError$ = this.store.select(selectAuthError);
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
      const credentials: LoginCredentials = this.form.value;
      this.store.dispatch(AuthActions.login({ credentials }));
    } else {
      // === FORMULAIRE INVALIDE ===

      // Marque tous les champs comme "touched" pour afficher les erreurs
      this.form.markAllAsTouched();

      // Log pour le débogage
      console.log('Formulaire invalide:', this.form.errors);
    }
  }
}
