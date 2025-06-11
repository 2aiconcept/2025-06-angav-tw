import { OrderStatus } from '@orders/enums';

export interface IOrder {
  id?: string;
  description: string;
  quantity: number;
  price: number;
  status: OrderStatus;
  customer: string;
}
