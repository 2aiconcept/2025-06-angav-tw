import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderEditPageComponent } from './order-edit-page.component';
import { OrderFacade } from '@orders/store/order.facade';
import { IOrder } from '@orders/interfaces';
import { signal } from '@angular/core';
import { OrderFormComponent } from '@orders/components';
import { By } from '@angular/platform-browser';
import { OrderStatus } from '@orders/enums';

describe('OrderEditPageComponent', () => {
  let component: OrderEditPageComponent;
  let fixture: ComponentFixture<OrderEditPageComponent>;
  let mockOrderFacade: any;

  const mockOrder: IOrder = {
    id: '1',
    description: 'Test',
    price: 100,
    quantity: 2,
    customer: 'Client',
    status: OrderStatus.Pending,
  };

  beforeEach(async () => {
    mockOrderFacade = {
      selectedOrder: signal(mockOrder),
      update: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [OrderEditPageComponent, OrderFormComponent],
      providers: [{ provide: OrderFacade, useValue: mockOrderFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the selected order from the facade', () => {
    expect(component.order()).toBe(mockOrder);
  });

  it('should display the order form if order exists', () => {
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.directive(OrderFormComponent));
    expect(form).toBeTruthy();
  });

  it('should not display the order form if order is null', () => {
    mockOrderFacade.selectedOrder.set(null);
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.directive(OrderFormComponent));
    expect(form).toBeNull();
  });

  it('should call action and update the order when form is submitted', () => {
    const updatedOrder = { ...mockOrder, description: 'Updated' };
    jest.spyOn(component, 'action');
    const form = fixture.debugElement.query(By.directive(OrderFormComponent));
    form.triggerEventHandler('submited', updatedOrder);
    fixture.detectChanges();
    expect(component.action).toHaveBeenCalledWith(updatedOrder);
    expect(mockOrderFacade.update).toHaveBeenCalledWith(
      updatedOrder,
      '/orders'
    );
  });
});
