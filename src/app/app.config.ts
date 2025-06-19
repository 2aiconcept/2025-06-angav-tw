import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from '@auth/store/auth.reducer';
import { authEffects } from '@auth/store/auth.effects';
import { orderEffects } from '@orders/store/order.effects';
import { ordersReducer } from '@orders/store/order.reducer';
import { httpInterceptor } from '@shared/interceptors/http.interceptor';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// IMPORTANT : Enregistrer les données de locale AVANT la config
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideStore({
      auth: authReducer,
      orders: ordersReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(authEffects, orderEffects),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
};
