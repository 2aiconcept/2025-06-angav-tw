import { OrderStatus } from '@orders/enums';
import { IOrder } from '@orders/interfaces';

export class Order implements IOrder {
  id?: string;
  description!: string;
  quantity = 1;
  price!: number;
  status = OrderStatus.Pending;
  customer!: string;
  constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
