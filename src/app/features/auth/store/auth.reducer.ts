import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '@auth/store/auth.actions';
export interface AuthState {
  isLoading: boolean; // Pour afficher les spinners pendant les appels API
  error: string | null; // Pour afficher les messages d'erreur
}

// État initial du store
export const initialAuthState: AuthState = {
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  // Quand on lance un login → on active le loading et on efface les erreurs précédentes
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  }))
);
