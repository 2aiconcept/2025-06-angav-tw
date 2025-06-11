import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderStatus } from '@orders/enums';
import { IOrder } from '@orders/interfaces';
import { Order } from '@orders/models';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  @Input() init!: IOrder;
  @Output() submited: EventEmitter<IOrder> = new EventEmitter<IOrder>();
  public states = Object.values(OrderStatus);
  public form!: FormGroup;
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.init.description],
      customer: [this.init.customer],
      quantity: [this.init.quantity],
      price: [this.init.price],
      status: [this.init.status, Validators.required],
      id: [this.init.id],
    });
  }

  public onSubmit(): void {
    this.submited.emit(this.form.value);
  }
}
