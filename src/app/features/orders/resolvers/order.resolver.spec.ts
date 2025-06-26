import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { orderResolver } from './order.resolver';
import { OrderFacade } from '@orders/store/order.facade';

describe('orderResolver', () => {
  let mockOrderFacade: any;
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => orderResolver(...resolverParameters));

  beforeEach(() => {
    mockOrderFacade = { getById: jest.fn() };
    TestBed.configureTestingModule({
      providers: [{ provide: OrderFacade, useValue: mockOrderFacade }],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should call orderFacade.getById with route param id and return true', () => {
    const route: any = { params: { id: '123' } };
    const state: any = {};
    const result = executeResolver(route, state);
    expect(mockOrderFacade.getById).toHaveBeenCalledWith('123');
    expect(result).toBe(true);
  });
});
