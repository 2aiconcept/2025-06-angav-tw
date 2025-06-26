import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderAddPageComponent } from './order-add-page.component';
import { OrderFacade } from '@orders/store/order.facade';
import { IOrder } from '@orders/interfaces';
import { Order } from '@orders/models';
import { OrderFormComponent } from '@orders/components';
import { By } from '@angular/platform-browser';
import { OrderStatus } from '@orders/enums';

describe('OrderAddPageComponent', () => {
  let component: OrderAddPageComponent;
  let fixture: ComponentFixture<OrderAddPageComponent>;
  let mockOrderFacade: any;

  beforeEach(async () => {
    mockOrderFacade = {
      add: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [OrderAddPageComponent, OrderFormComponent],
      providers: [{ provide: OrderFacade, useValue: mockOrderFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize item as an instance of Order', () => {
    expect(component.item).toBeInstanceOf(Order);
  });

  it('should display the order form', () => {
    const form = fixture.debugElement.query(By.directive(OrderFormComponent));
    expect(form).toBeTruthy();
  });

  it('should call action and add the order when form is submitted', () => {
    const newOrder: IOrder = {
      id: '1',
      description: 'Nouvelle commande',
      price: 100,
      quantity: 1,
      customer: 'Client',
      status: OrderStatus.Pending,
    };
    jest.spyOn(component, 'action');
    const form = fixture.debugElement.query(By.directive(OrderFormComponent));
    form.triggerEventHandler('submited', newOrder);
    fixture.detectChanges();
    expect(component.action).toHaveBeenCalledWith(newOrder);
    expect(mockOrderFacade.add).toHaveBeenCalledWith(newOrder, '/orders');
  });
});
