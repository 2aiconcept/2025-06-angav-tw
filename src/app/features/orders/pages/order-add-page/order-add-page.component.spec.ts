import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddPageComponent } from './order-add-page.component';

describe('OrderAddPageComponent', () => {
  let component: OrderAddPageComponent;
  let fixture: ComponentFixture<OrderAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
