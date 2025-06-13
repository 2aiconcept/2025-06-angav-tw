// === FEATURE SELECTOR ===

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Sélectionne la branche 'auth' du store global
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// === SELECTORS SIMPLES ===
// Sélecteur pour l'état de chargement
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

// Sélecteur pour les erreurs d'authentification
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
