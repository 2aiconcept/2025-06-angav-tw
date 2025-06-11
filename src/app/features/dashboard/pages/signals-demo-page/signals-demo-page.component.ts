import { Component, computed, inject, signal } from '@angular/core';
import { SignalDataService } from '@dashboard/services';

@Component({
  selector: 'app-signals-demo-page',
  imports: [],
  templateUrl: './signals-demo-page.component.html',
  styleUrl: './signals-demo-page.component.scss',
})
export class SignalsDemoPageComponent {
  signalService = inject(SignalDataService);

  // Signal simple avec valeur initiale
  count = signal(0);

  // Méthode pour modifier le signal
  increment() {
    this.count.set(this.count() + 1);
  }

  double() {
    // update() avec une transformation plus complexe
    this.count.update((current) => current * 2);
  }

  reset() {
    // set() : remplacer complètement la valeur
    this.count.set(0);
  }

  // Signal de base
  priceHT = signal(100);

  // Computed : se recalcule automatiquement !
  priceTTC = computed(() => this.priceHT() * 1.2);
  tvaAmount = computed(() => this.priceTTC() - this.priceHT());

  changePrice() {
    this.priceHT.set(150);
    // priceTTC et tvaAmount se mettent à jour automatiquement !
  }

  // Méthode pour incrémenter le num de version
  incrementVersion() {
    this.signalService.increment();
  }
}
