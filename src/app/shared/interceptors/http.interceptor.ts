import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // req = HttpRequest (objet statique)
  // next = fonction qui retourne Observable<HttpEvent>
  console.log(`INTERCEPTOR: ${req.method} ${req.url}`);
  // === INJECTION DU SERVICE D'AUTHENTIFICATION ===
  const authService = inject(AuthService);

  // === RÉCUPÉRATION DU TOKEN ===
  const token = authService.getToken();

  // === AJOUT DU TOKEN SI NÉCESSAIRE ===
  let authReq = req;
  if (token) {
    // Clonage de la requête avec ajout du header Authorization
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Token ajouté à la requête: ${req.method} ${req.url}`);
  } else {
    console.log(`Aucun token ajouté pour la requête: ${req.method} ${req.url}`);
  }

  // === ENVOI DE LA REQUÊTE AVEC GESTION DES ERREURS ===
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(`ERREUR INTERCEPTÉE: ${error.status} sur ${req.url}`);
      // Si erreur 401 (token invalide/expiré) → déconnexion automatique
      if (error.status === 401) {
        console.warn('Token expiré ou invalide - déconnexion automatique');
        authService.logout();
      }

      // Re-lancement de l'erreur pour que l'ApiService puisse la traiter
      return throwError(() => error);
    })
  );
};
