import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services';

export const guestGuard: CanActivateFn = (route, state) => {
  // === INJECTION DES DÉPENDANCES ===

  const authService = inject(AuthService);
  const router = inject(Router);

  // === VÉRIFICATION DE L'AUTHENTIFICATION ===

  const isAuthenticated = authService.isLoggedIn();

  // === LOGIQUE DE PROTECTION INVERSE ===

  if (!isAuthenticated) {
    // ✓ Utilisateur non connecté : peut accéder aux pages signin/signup
    console.log(
      "Guard: Utilisateur non authentifié, accès autorisé aux pages d'auth"
    );
    return true;
  } else {
    // ✗ Utilisateur déjà connecté : redirection vers dashboard
    console.log(
      'Guard: Utilisateur déjà connecté, redirection vers /dashboard'
    );

    // Redirection vers le dashboard
    router.navigate(['/dashboard']);

    // Refus de l'accès aux pages d'authentification
    return false;
  }
};
