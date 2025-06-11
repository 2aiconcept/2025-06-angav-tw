import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderFormComponent } from '@orders/components';
import { IOrder } from '@orders/interfaces';
import { OrderService } from '@orders/services';

@Component({
  selector: 'app-order-edit-page',
  imports: [AsyncPipe, OrderFormComponent],
  templateUrl: './order-edit-page.component.html',
  styleUrl: './order-edit-page.component.scss',
})
export class OrderEditPageComponent {
  private readonly orderService = inject(OrderService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  id = this.route.snapshot.params['id'];
  public item$ = this.orderService.getItemById(this.id);
  public action(item: IOrder): void {
    this.orderService.update(item).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }
}
