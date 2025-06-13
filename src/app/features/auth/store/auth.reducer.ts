// src/app/features/auth/store/auth.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

// Interface pour l'état du store NgRx (simplifié)
export interface AuthState {
  isLoading: boolean; // Pour afficher les spinners pendant les appels API
  error: string | null; // Pour afficher les messages d'erreur
}

// État initial du store
export const initialAuthState: AuthState = {
  isLoading: false,
  error: null,
};

// Reducer qui gère les transitions d'état
export const authReducer = createReducer(
  initialAuthState,

  // === ACTIONS QUI DÉCLENCHENT UN LOADING ===

  // Quand on lance un login → on active le loading et on efface les erreurs précédentes
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // Quand on lance un register → même logique
  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // === ACTIONS DE SUCCÈS ===

  // Login réussi → on arrête le loading (pas d'erreur)
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),

  // Register réussi → même logique
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),

  // === ACTIONS D'ÉCHEC ===

  // Login échoué → on arrête le loading et on stocke l'erreur
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // Register échoué → même logique
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
