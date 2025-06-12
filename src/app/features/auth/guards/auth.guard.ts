import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services';

export const authGuard: CanActivateFn = (route, state) => {
  // guard qui doit return true si l'utilisateur est authentifié et rediriger vers dashboard
  // et false sinon redirect vers /signin
  // === INJECTION DES DÉPENDANCES ===

  // Service d'authentification pour vérifier le statut de connexion
  const authService = inject(AuthService);

  // Router pour effectuer les redirections
  const router = inject(Router);

  // === VÉRIFICATION DE L'AUTHENTIFICATION ===

  // Utilisation du computed signal isLoggedIn() du AuthService
  // Ce signal se base sur currentUser() et token() et se met à jour automatiquement
  const isAuthenticated = authService.isLoggedIn();

  // === LOGIQUE DE REDIRECTION ===
  if (isAuthenticated) {
    // Utilisateur connecté : accès autorisé
    console.log('Guard: Utilisateur authentifié, accès autorisé');
    return true;
  } else {
    // Utilisateur non connecté : redirection vers signin
    console.log('Guard: Utilisateur non authentifié, redirection vers /signin');

    // Redirection vers la page de connexion
    // navigate() retourne une Promise<boolean>, mais Angular accepte aussi boolean
    router.navigate(['/signin']);

    // Refus de l'accès à la route demandée
    return false;
  }
};
