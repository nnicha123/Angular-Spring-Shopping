import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderItemFront } from '../../models/orderItem';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
})
export class OrderCardComponent {
  @Input() orderItem!: OrderItemFront;
  @Input() readOnly: boolean = false;
  @Output() quantity: EventEmitter<number> = new EventEmitter();

  minQuantity: number = 1;
  maxQuantity: number = 10;

  onDelete() {
    this.quantity.emit(0);
  }

  updateQuantity(instruction: string) {
    if (instruction === 'increment') {
      this.orderItem.quantity += 1;
    } else {
      this.orderItem.quantity -= 1;
    }
    this.quantity.emit(this.orderItem.quantity);
  }
}
