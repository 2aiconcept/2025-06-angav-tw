import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '@auth/store/auth.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
// @Injectable()

// === EFFECT POUR LE LOGIN ===
export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      // Écoute uniquement l'action 'login'
      ofType(AuthActions.login),

      // exhaustMap : ignore les nouvelles actions tant que la précédente n'est pas terminée
      // Ici on utilise exhaustMap pour éviter les requêtes concurrentes
      exhaustMap(({ credentials }) =>
        // Appel du service auth qui utilise ApiService (qui gère déjà les erreurs)
        authService.signin(credentials).pipe(
          // Si succès → dispatch loginSuccess avec la réponse
          map((response) => AuthActions.loginSuccess({ response })),

          // Si erreur → l'ApiService a déjà transformé l'erreur en { status, message }
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      // Écoute uniquement l'action 'register'
      ofType(AuthActions.register),

      // exhaustMap : ignore les nouvelles actions tant que la précédente n'est pas terminée
      // Ici on utilise exhaustMap pour éviter les requêtes concurrentes
      exhaustMap(({ registerData }) =>
        // Appel du service auth qui utilise ApiService (qui gère déjà les erreurs)
        authService.signup(registerData).pipe(
          // Si succès → dispatch loginSuccess avec la réponse
          map((response) => AuthActions.registerSuccess({ response })),

          // Si erreur → l'ApiService a déjà transformé l'erreur en { status, message }
          catchError((error) =>
            of(AuthActions.registerFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const authEffects = {
  login: loginEffect,
  register: registerEffect,
};
