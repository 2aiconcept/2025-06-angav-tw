import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '@orders/interfaces';
import { OrderFacade } from '@orders/store/order.facade';

@Component({
  selector: 'app-order-list-page',
  imports: [CurrencyPipe],
  templateUrl: './order-list-page.component.html',
  styleUrl: './order-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListPageComponent {
  private readonly orderFacade = inject(OrderFacade);
  private readonly router = inject(Router);

  collection = this.orderFacade.orders;
  isLoading = this.orderFacade.isLoading;
  error = this.orderFacade.error;

  constructor() {
    this.orderFacade.loadOrders();
  }

  /**
   * Navigue vers le formulaire d'ajout
   */
  onAdd(): void {
    this.router.navigate(['/orders/add']);
  }

  /**
   * Navigue vers le formulaire d'édition
   */
  onEdit(order: IOrder): void {
    this.router.navigate(['/orders/edit', order.id]);
  }

  /**
   * Supprime une commande
   */
  onDelete(order: IOrder): void {
    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer la commande "${order.description}" ?`
      )
    ) {
      if (order.id) {
        this.orderFacade.delete(order.id);
      }
    }
  }

  getTotal(price: number, quantity: number): number {
    console.log('total called');
    return price * quantity;
  }
}
