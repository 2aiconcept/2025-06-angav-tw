import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

/**
 * Service de confirmation SSR-safe
 * Utilise window.confirm côté client et retourne false côté serveur
 */
@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private platformId = inject(PLATFORM_ID);

  /**
   * Affiche une boîte de dialogue de confirmation
   * @param message Le message à afficher
   * @returns true si l'utilisateur confirme, false sinon (ou côté serveur)
   */
  confirm(message: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.confirm(message);
    }
    // Côté serveur, on retourne false par défaut
    // Cela évite les erreurs et permet au SSR de fonctionner
    return false;
  }

  /**
   * Version asynchrone pour les cas où on veut gérer la confirmation différemment
   * @param message Le message à afficher
   * @returns Promise<boolean>
   */
  async confirmAsync(message: string): Promise<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      return Promise.resolve(window.confirm(message));
    }
    return Promise.resolve(false);
  }
}
