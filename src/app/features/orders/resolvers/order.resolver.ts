import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OrderFacade } from '@orders/store/order.facade';

export const orderResolver: ResolveFn<boolean> = (route, state) => {
  const orderFacade = inject(OrderFacade);
  orderFacade.getById(route.params['id']);
  return true;
};
