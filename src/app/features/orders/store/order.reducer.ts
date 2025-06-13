import { createReducer, on } from '@ngrx/store';
import { IOrder } from '@orders/interfaces';
import { OrderActions } from '.';

// === STATE INTERFACE ===
export interface OrdersState {
  orders: IOrder[];
  selectedOrder: IOrder | null;
  isLoading: boolean;
  error: string | null;
}

// === INITIAL STATE ===
export const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
};

// === REDUCER ===
export const ordersReducer = createReducer(
  initialState,

  // === LOAD ORDERS ===
  on(OrderActions.loadOrders, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(OrderActions.loadOrdersSuccess, (state, { orders: orders }) => ({
    ...state,
    orders: orders,
    isLoading: false,
    error: null,
  })),

  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // === DELETE ORDER ===
  on(OrderActions.deleteOrder, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(OrderActions.deleteOrderSuccess, (state, { id }) => ({
    ...state,
    orders: state.orders.filter((order) => order.id !== id),
    // Reset selectedOrder si c'est celle qui a été supprimée
    selectedOrder: state.selectedOrder?.id === id ? null : state.selectedOrder,
    isLoading: false,
    error: null,
  })),

  on(OrderActions.deleteOrderFailure, (state, { error: error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // === ADD ORDER ===
  on(OrderActions.addOrder, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(OrderActions.addOrderSuccess, (state, { order: order }) => ({
    ...state,
    orders: [...state.orders, order],
    isLoading: false,
    error: null,
  })),

  on(OrderActions.addOrderFailure, (state, { error: error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // === UPDATE ORDER ===
  on(OrderActions.updateOrder, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(OrderActions.updateOrderSuccess, (state, { order: order }) => ({
    ...state,
    orders: state.orders.map((existingOrder) =>
      existingOrder.id === order.id ? order : existingOrder
    ),
    // Mettre à jour selectedOrder si c'est celle qui a été modifiée
    selectedOrder:
      state.selectedOrder?.id === order.id ? order : state.selectedOrder,
    isLoading: false,
    error: null,
  })),

  on(OrderActions.updateOrderFailure, (state, { error: error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // === GET ORDER BY ID ===
  on(OrderActions.getOrderById, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(OrderActions.getOrderByIdSuccess, (state, { order: order }) => ({
    ...state,
    selectedOrder: order,
    isLoading: false,
    error: null,
  })),

  on(OrderActions.getOrderByIdFailure, (state, { error: error }) => ({
    ...state,
    selectedOrder: null,
    isLoading: false,
    error: error,
  }))
);
