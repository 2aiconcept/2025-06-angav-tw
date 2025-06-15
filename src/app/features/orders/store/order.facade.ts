import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IOrder } from '@orders/interfaces';
import { Observable } from 'rxjs';
import { OrderActions, OrderSelectors } from '.';

@Injectable({
  providedIn: 'root',
})
export class OrderFacade {
  private readonly store = inject(Store);

  // === SELECTORS (données exposées aux components) ===

  /**
   * Toutes les commandes
   */
  // transforme l'Observable selectOrders en signal
  orders = this.store.selectSignal<IOrder[]>(OrderSelectors.selectOrders);

  /**
   * Commande sélectionnée
   */
  selectedOrder = this.store.selectSignal<IOrder | null>(
    OrderSelectors.selectSelectedOrder
  );

  /**
   * État de chargement
   */
  isLoading = this.store.selectSignal<boolean>(
    OrderSelectors.selectOrdersLoading
  );

  /**
   * Message d'erreur
   */
  error = this.store.selectSignal<string | null>(
    OrderSelectors.selectOrdersError
  );

  // === ACTIONS (méthodes exposées aux components) ===

  /**
   * Charge toutes les commandes
   */
  loadOrders(): void {
    this.store.dispatch(OrderActions.loadOrders());
  }

  /**
   * Supprime une commande
   */
  delete(id: string): void {
    this.store.dispatch(OrderActions.deleteOrder({ id }));
  }

  /**
   * Ajoute une nouvelle commande
   */
  add(order: IOrder): void {
    this.store.dispatch(OrderActions.addOrder({ order }));
  }

  /**
   * Met à jour une commande existante
   */
  update(order: IOrder): void {
    this.store.dispatch(OrderActions.updateOrder({ order }));
  }

  /**
   * Récupère une commande par son ID
   */
  getById(id: string): void {
    this.store.dispatch(OrderActions.getOrderById({ id }));
  }
}
