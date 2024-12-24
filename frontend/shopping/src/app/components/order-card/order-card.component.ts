import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
})
export class OrderCardComponent {
  @Input() order: any;
  @Output() quantity: EventEmitter<number> = new EventEmitter();

  minQuantity: number = 1;
  maxQuantity: number = 10;

  onDelete() {
    this.quantity.emit(0);
  }

  updateQuantity(instruction: string) {
    if (instruction === 'increment') {
      this.order.quantity += 1;
    } else {
      this.order.quantity -= 1;
    }
    this.quantity.emit(this.order.quantity);
  }
}
