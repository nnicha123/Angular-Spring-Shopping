import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
})
export class OrderCardComponent {
  @Input() order: any;

  minQuantity: number = 1;
  maxQuantity: number = 10;

  updateQuantity(instruction: string) {
    if (instruction === 'increment') {
      this.order.quantity += 1;
    } else {
      this.order.quantity -= 1;
    }
  }
}
