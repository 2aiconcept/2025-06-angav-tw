import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrderFormComponent } from '@orders/components';
import { IOrder } from '@orders/interfaces';
import { Order } from '@orders/models';
import { OrderFacade } from '@orders/store/order.facade';

@Component({
  selector: 'app-order-add-page',
  imports: [OrderFormComponent],
  templateUrl: './order-add-page.component.html',
  styleUrl: './order-add-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderAddPageComponent {
  private readonly facade = inject(OrderFacade);
  public item = new Order();
  public action(item: IOrder): void {
    this.facade.add(item, '/orders');
  }
}
