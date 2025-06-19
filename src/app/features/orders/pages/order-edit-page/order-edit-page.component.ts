import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);
  private readonly orderFacade = inject(OrderFacade);
  private id = this.route.snapshot.params['id'];
  public order = this.orderFacade.selectedOrder;

  constructor() {
    this.orderFacade.getById(this.id);
  }

  public action(order: IOrder): void {
    this.orderFacade.update(order);
  }
}
