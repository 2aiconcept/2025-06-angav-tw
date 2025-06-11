import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '@orders/interfaces';
import { OrderStatus } from '@orders/enums';
import { ApiService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiService = inject(ApiService);
  private readonly endpoint = '/orders';

  // Méthodes CRUD principales

  /**
   * Récupère toutes les commandes
   */
  getAll(): Observable<IOrder[]> {
    return this.apiService.get<IOrder[]>(this.endpoint);
  }

  /**
   * Récupère une commande par son ID
   */
  getItemById(id: string): Observable<IOrder> {
    return this.apiService.get<IOrder>(`${this.endpoint}/${id}`);
  }

  /**
   * Ajoute une nouvelle commande
   */
  add(order: IOrder): Observable<IOrder> {
    return this.apiService.post<IOrder>(this.endpoint, order);
  }

  /**
   * Met à jour une commande existante
   */
  update(item: Partial<IOrder>): Observable<IOrder> {
    return this.apiService.put<IOrder>(`${this.endpoint}/${item.id}`, item);
  }

  /**
   * Supprime une commande
   */
  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  // Méthodes utilitaires

  /**
   * Met à jour le statut d'une commande
   */
  updateStatus(item: IOrder, status: OrderStatus): Observable<IOrder> {
    const obj = { ...item };
    obj.status = status;
    return this.update(obj);
  }
}
