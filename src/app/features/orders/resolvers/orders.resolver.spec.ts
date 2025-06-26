import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { ordersResolver } from './orders.resolver';
import { OrderFacade } from '@orders/store/order.facade';

describe('ordersResolver', () => {
  let mockOrderFacade: any;
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => ordersResolver(...resolverParameters));

  beforeEach(() => {
    mockOrderFacade = { loadOrders: jest.fn() };
    TestBed.configureTestingModule({
      providers: [{ provide: OrderFacade, useValue: mockOrderFacade }],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should call orderFacade.loadOrders and return true', () => {
    const route: any = {};
    const state: any = {};
    const result = executeResolver(route, state);
    expect(mockOrderFacade.loadOrders).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
