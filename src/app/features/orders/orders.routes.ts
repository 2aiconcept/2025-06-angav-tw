import { Route } from '@angular/router';
import { OrderListPageComponent } from './pages/order-list-page/order-list-page.component';
import { OrderAddPageComponent } from './pages/order-add-page/order-add-page.component';
import { OrderEditPageComponent } from './pages/order-edit-page/order-edit-page.component';
import { orderResolver } from './resolvers/order.resolver';
import { ordersResolver } from './resolvers/orders.resolver';

export const routes: Route[] = [
  {
    path: '',
    component: OrderListPageComponent,
    resolve: { order: ordersResolver },
  },
  {
    path: 'add',
    component: OrderAddPageComponent,
  },
  {
    path: 'edit/:id',
    component: OrderEditPageComponent,
    resolve: { order: orderResolver },
  },
];
