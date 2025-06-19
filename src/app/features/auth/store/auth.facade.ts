import { inject, Injectable } from '@angular/core';
import { selectAuthError, selectAuthLoading } from './auth.selectors';
import { Store } from '@ngrx/store';
import { LoginCredentials, RegisterData } from '@auth/interfaces';
import { AuthActions } from '.';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private store = inject(Store);

  // === SELECTORS - États observables ===
  // readonly isLoading$ = this.store.select(selectAuthLoading);
  // readonly error$ = this.store.select(selectAuthError);

  readonly isLoading = this.store.selectSignal(selectAuthLoading);
  readonly error = this.store.selectSignal(selectAuthError);

  // === ACTIONS - Méthodes pour dispatcher ===

  /**
   * Connexion utilisateur
   */
  login(credentials: LoginCredentials): void {
    this.store.dispatch(AuthActions.login({ credentials }));
  }

  /**
   * Inscription utilisateur
   */
  register(registerData: RegisterData): void {
    this.store.dispatch(AuthActions.register({ registerData }));
  }
}
