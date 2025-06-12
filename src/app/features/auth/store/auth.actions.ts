// === ACTIONS DE LOGIN ===

import { AuthResponse, LoginCredentials, RegisterData } from '@auth/interfaces';
import { createAction, props } from '@ngrx/store';

// dispatche dans un component
// capturée par un reducer pour maj loading et error dans la state
// capturée par effect pour app service auth
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginCredentials }>()
);

// dispatch par un effect après un appel API réussi
// capturee par reducer pour mettre à jour le state avec la reponse de l'api
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: AuthResponse }>()
);

// dispatch par un effect après un appel API échoué
// capturée par reducer pour mettre à jour le state avec la reponse de l'api
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// === ACTIONS DE REGISTER ===
// dispatche dans un component
// capturée par un reducer pour maj loading et error dans la state
// capturée par effect pour call api register
export const register = createAction(
  '[Auth] Register',
  props<{ registerData: RegisterData }>()
);

// dispatche par un effect après un appel API réussi
// capturee par reducer pour mettre à jour le state avec la reponse de l'api
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: AuthResponse }>()
);
// dispatche par un effect après un appel API échoué
// capturée par reducer pour mettre à jour le state avec la reponse de l'api
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);
