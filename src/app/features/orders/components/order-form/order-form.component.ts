import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderStatus } from '@orders/enums';
import { IOrder } from '@orders/interfaces';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  init = input.required<IOrder>();
  // ancienne approche
  // @Output() submited: EventEmitter<IOrder> = new EventEmitter<IOrder>();
  // nouvelle approche avec output signal
  submited = output<IOrder>();

  public states = Object.values(OrderStatus);
  public form!: FormGroup;
  private readonly fb = inject(FormBuilder);
  constructor() {
    console.log(this.init);
  }
  ngOnInit(): void {
    console.log(this.init);
    this.form = this.fb.group({
      description: [this.init().description],
      customer: [this.init().customer],
      quantity: [this.init().quantity],
      price: [this.init().price],
      status: [this.init().status, Validators.required],
      id: [this.init().id],
    });
  }

  public onSubmit(): void {
    this.submited.emit(this.form.value);
  }
}
