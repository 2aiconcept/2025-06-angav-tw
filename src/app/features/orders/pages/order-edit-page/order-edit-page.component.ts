import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrderFormComponent } from '@orders/components';
import { IOrder } from '@orders/interfaces';
import { OrderFacade } from '@orders/store/order.facade';

@Component({
  selector: 'app-order-edit-page',
  imports: [OrderFormComponent],
  templateUrl: './order-edit-page.component.html',
  styleUrl: './order-edit-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderEditPageComponent {
  private readonly orderFacade = inject(OrderFacade);
  public order = this.orderFacade.selectedOrder;

  public action(order: IOrder): void {
    this.orderFacade.update(order, '/orders');
  }
}
