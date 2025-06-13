// === FEATURE SELECTOR ===

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './order.reducer';

// Sélectionne la branche 'orders' du store global
export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

// === SELECTORS SIMPLES ===

// Sélecteur pour la liste des commandes
export const selectOrders = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.orders
);

// Sélecteur pour la commande sélectionnée
export const selectSelectedOrder = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.selectedOrder
);

// Sélecteur pour l'état de chargement
export const selectOrdersLoading = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.isLoading
);

// Sélecteur pour les erreurs
export const selectOrdersError = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.error
);
