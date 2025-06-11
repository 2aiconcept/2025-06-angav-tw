import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '@orders/interfaces';
import { OrderService } from '@orders/services';

@Component({
  selector: 'app-order-list-page',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './order-list-page.component.html',
  styleUrl: './order-list-page.component.scss',
})
export class OrderListPageComponent {
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  // Initialisation directe - Plus simple !
  collection$ = this.orderService.getAll();

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
      this.orderService.delete(order.id!).subscribe(() => {
        // Recharge la liste après suppression
        this.collection$ = this.orderService.getAll();
      });
    }
  }

  getTotal(price: number, quantity: number): number {
    console.log('total called');
    return price * quantity;
  }
}
