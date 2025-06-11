import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderFormComponent } from '@orders/components';
import { IOrder } from '@orders/interfaces';
import { Order } from '@orders/models';
import { OrderService } from '@orders/services';

@Component({
  selector: 'app-order-add-page',
  imports: [OrderFormComponent],
  templateUrl: './order-add-page.component.html',
  styleUrl: './order-add-page.component.scss',
})
export class OrderAddPageComponent {
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);
  public item = new Order();
  public action(item: IOrder): void {
    this.orderService.add(item).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }
}
