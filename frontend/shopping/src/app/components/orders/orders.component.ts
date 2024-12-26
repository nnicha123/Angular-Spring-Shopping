import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, Status } from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  @Input() order!: Order;
  readOnly: boolean = false;
  ngOnInit(): void {
    this.readOnly = this.order.status !== 'PENDING';
  }

  quantityUpdate(quantity: number, index: number) {
    this.orderService.updateOrderItemQuantity(quantity, index);
  }
}
