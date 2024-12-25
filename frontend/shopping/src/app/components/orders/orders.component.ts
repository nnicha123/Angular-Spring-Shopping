import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { OrderItemFront } from '../../models/orderItem';
import { OrderService } from '../../services/order.service';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  totalPrice: number = 0;
  totalQuantity: number = 0;

  maxQuantity: number = 10;
  minQuantity: number = 1;
  justPurchased: boolean = false;

  destroy$: Subject<void> = new Subject<void>();
  orderItems$: Observable<OrderItemFront[]> = of([]);
  currentOrder$: Observable<Order | null> = of(null);

  constructor(private orderService: OrderService) {
    this.currentOrder$ = this.orderService.currentOrder$;
  }

  ngOnInit(): void {
    // Temp customerid
    if (!this.orderService.hasApiBeenCalled()) {
      const tempCustomerId = 3;
      this.orderService
        .getOrdersByCustomerId(tempCustomerId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((orders) => {
          this.orderService.markApiAsCalled();
          this.orderService.setOrders(orders);
        });
    }
  }

  quantityUpdate(quantity: number, index: number) {
    this.orderService.updateOrderItemQuantity(quantity, index);
  }

  saveOrder() {
    this.orderService.saveOrder().pipe(takeUntil(this.destroy$)).subscribe();
  }

  purchaseOrder() {
    this.orderService
      .purchaseOrder()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
