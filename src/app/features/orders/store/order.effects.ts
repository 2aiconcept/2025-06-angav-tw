// src/app/features/orders/store/orders.effects.ts
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '@orders/services/order.service';
import { exhaustMap, map, catchError, of } from 'rxjs';
import * as OrderActions from './order.actions';

// === EFFECT LOAD ALL ORDERS ===
export const loadOrdersEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.loadOrders),
      exhaustMap(() =>
        orderService.getAll().pipe(
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error) =>
            of(OrderActions.loadOrdersFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

// === EFFECT DELETE ORDER ===
export const deleteOrderEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.deleteOrder),
      exhaustMap(({ id }) =>
        orderService.delete(id).pipe(
          map(() => OrderActions.deleteOrderSuccess({ id })),
          catchError((error) =>
            of(OrderActions.deleteOrderFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

// === EFFECT ADD ORDER ===
export const addOrderEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.addOrder),
      exhaustMap(({ order }) =>
        orderService.add(order).pipe(
          map((createdOrder) =>
            OrderActions.addOrderSuccess({ order: createdOrder })
          ),
          catchError((error) =>
            of(OrderActions.addOrderFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

// === EFFECT UPDATE ORDER ===
export const updateOrderEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.updateOrder),
      exhaustMap(({ order }) =>
        orderService.update(order).pipe(
          map((updatedOrder) =>
            OrderActions.updateOrderSuccess({ order: updatedOrder })
          ),
          catchError((error) =>
            of(OrderActions.updateOrderFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

// === EFFECT GET ORDER BY ID ===
export const getOrderByIdEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.getOrderById),
      exhaustMap(({ id }) =>
        orderService.getItemById(id).pipe(
          map((order) => OrderActions.getOrderByIdSuccess({ order })),
          catchError((error) =>
            of(OrderActions.getOrderByIdFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

// === EXPORT POUR app.config.ts ===
export const orderEffects = {
  loadAll: loadOrdersEffect,
  delete: deleteOrderEffect,
  add: addOrderEffect,
  update: updateOrderEffect,
  loadOrder: getOrderByIdEffect,
};
