import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, Status } from '../../models/order';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private orderService: OrderService) {
    // this.getOrders();
  }

  @Input() order!: Order;
  readOnly: boolean = false;
  ngOnInit(): void {
    this.readOnly = this.order.status !== 'PENDING';
  }

  // getOrders() {
  //   console.log('hello?');
  //   // Temp customerid
  //   if (!this.orderService.hasApiBeenCalled()) {
  //     console.log('in here');
  //     const tempCustomerId = 3;
  //     this.orderService
  //       .getOrdersByCustomerId(tempCustomerId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((orders) => {
  //         this.orderService.markApiAsCalled();
  //         this.orderService.setOrders(orders);
  //       });
  //   }
  // }

  quantityUpdate(quantity: number, index: number) {
    this.orderService.updateOrderItemQuantity(quantity, index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
