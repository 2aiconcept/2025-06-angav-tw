import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '@auth/store/auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  // === EFFECT POUR LE LOGIN ===
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) => this.authService.signin(credentials)),
      map((response) => AuthActions.loginSuccess({ response: response })),
      catchError((error) =>
        of(AuthActions.loginFailure({ error: error.message }))
      )
    )
  );
}
