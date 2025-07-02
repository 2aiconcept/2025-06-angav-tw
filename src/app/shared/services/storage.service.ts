import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

/**
 * Service de stockage SSR-safe
 * Utilise localStorage côté client et un stockage en mémoire côté serveur
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);

  // Stockage en mémoire pour le côté serveur
  private memoryStorage = new Map<string, string>();

  /**
   * Définit une valeur dans le stockage
   * @param key La clé
   * @param value La valeur à stocker
   */
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    } else {
      // Côté serveur, on utilise le stockage en mémoire
      this.memoryStorage.set(key, value);
    }
  }

  /**
   * Récupère une valeur du stockage
   * @param key La clé
   * @returns La valeur stockée ou null si non trouvée
   */
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    } else {
      // Côté serveur, on utilise le stockage en mémoire
      return this.memoryStorage.get(key) || null;
    }
  }

  /**
   * Supprime une valeur du stockage
   * @param key La clé à supprimer
   */
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    } else {
      // Côté serveur, on supprime du stockage en mémoire
      this.memoryStorage.delete(key);
    }
  }

  /**
   * Efface tout le stockage
   */
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    } else {
      // Côté serveur, on efface le stockage en mémoire
      this.memoryStorage.clear();
    }
  }

  /**
   * Vérifie si une clé existe dans le stockage
   * @param key La clé à vérifier
   * @returns true si la clé existe
   */
  hasItem(key: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key) !== null;
    } else {
      // Côté serveur, on vérifie dans le stockage en mémoire
      return this.memoryStorage.has(key);
    }
  }

  /**
   * Récupère toutes les clés du stockage
   * @returns Un tableau des clés
   */
  keys(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      return Object.keys(localStorage);
    } else {
      // Côté serveur, on retourne les clés du stockage en mémoire
      return Array.from(this.memoryStorage.keys());
    }
  }

  /**
   * Récupère le nombre d'éléments dans le stockage
   * @returns Le nombre d'éléments
   */
  length(): number {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.length;
    } else {
      // Côté serveur, on retourne la taille du stockage en mémoire
      return this.memoryStorage.size;
    }
  }
}
