import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { ApiService } from '@shared/services';
import { of } from 'rxjs';
import { IOrder } from '@orders/interfaces';
import { OrderStatus } from '@orders/enums';

// Mock de ApiService
const apiServiceMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: ApiService, useValue: apiServiceMock },
      ],
    });
    service = TestBed.inject(OrderService);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test getAll
  it('should call apiService.get with /orders for getAll', () => {
    const orders: IOrder[] = [];
    apiServiceMock.get.mockReturnValue(of(orders));
    service.getAll().subscribe((result) => {
      expect(result).toBe(orders);
    });
    expect(apiServiceMock.get).toHaveBeenCalledWith('/orders');
  });

  // Test getItemById
  it('should call apiService.get with /orders/:id for getItemById', () => {
    const order: IOrder = {
      id: '1',
      description: '',
      price: 0,
      quantity: 0,
      customer: '',
      status: OrderStatus.Pending,
    };
    apiServiceMock.get.mockReturnValue(of(order));
    service.getItemById('1').subscribe((result) => {
      expect(result).toBe(order);
    });
    expect(apiServiceMock.get).toHaveBeenCalledWith('/orders/1');
  });

  // Test add
  it('should call apiService.post with /orders and order for add', () => {
    const order: IOrder = {
      id: '1',
      description: '',
      price: 0,
      quantity: 0,
      customer: '',
      status: OrderStatus.Pending,
    };
    apiServiceMock.post.mockReturnValue(of(order));
    service.add(order).subscribe((result) => {
      expect(result).toBe(order);
    });
    expect(apiServiceMock.post).toHaveBeenCalledWith('/orders', order);
  });

  // Test update
  it('should call apiService.put with /orders/:id and item for update', () => {
    const order: Partial<IOrder> = { id: '1', description: 'updated' };
    const updatedOrder: IOrder = {
      id: '1',
      description: 'updated',
      price: 0,
      quantity: 0,
      customer: '',
      status: OrderStatus.Pending,
    };
    apiServiceMock.put.mockReturnValue(of(updatedOrder));
    service.update(order).subscribe((result) => {
      expect(result).toBe(updatedOrder);
    });
    expect(apiServiceMock.put).toHaveBeenCalledWith('/orders/1', order);
  });

  // Test delete
  it('should call apiService.delete with /orders/:id for delete', () => {
    apiServiceMock.delete.mockReturnValue(of(undefined));
    service.delete('1').subscribe((result) => {
      expect(result).toBeUndefined();
    });
    expect(apiServiceMock.delete).toHaveBeenCalledWith('/orders/1');
  });

  // Test updateStatus
  it('should call update with the order and new status for updateStatus', () => {
    const order: IOrder = {
      id: '1',
      description: '',
      price: 0,
      quantity: 0,
      customer: '',
      status: OrderStatus.Pending,
    };
    const updatedOrder: IOrder = { ...order, status: OrderStatus.Completed };
    // On mock la méthode update du service
    jest.spyOn(service, 'update').mockReturnValue(of(updatedOrder));
    service.updateStatus(order, OrderStatus.Completed).subscribe((result) => {
      expect(result).toEqual(updatedOrder);
    });
    expect(service.update).toHaveBeenCalledWith({
      ...order,
      status: OrderStatus.Completed,
    });
  });
});
