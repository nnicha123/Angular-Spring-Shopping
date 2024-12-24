import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { OrderItemFront } from '../../models/orderItem';
import { OrderService } from '../../services/order.service';
import { Observable, of } from 'rxjs';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;

  maxQuantity: number = 10;
  minQuantity: number = 1;
  justPurchased: boolean = false;

  orderItems$: Observable<OrderItemFront[]> = of([]);
  order$: Observable<Order | null> = of(null);

  constructor(private orderService: OrderService) {
    this.orderItems$ = this.orderService.orderItems$;
    this.order$ = this.orderService.orders$;
  }

  ngOnInit(): void {}

  quantityUpdate(quantity: number, index: number) {
    this.orderService.updateOrderItemQuantity(quantity, index);
  }
}
