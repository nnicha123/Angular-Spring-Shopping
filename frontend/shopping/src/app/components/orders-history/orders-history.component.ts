import { Component } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Order, Status } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css'],
})
export class OrdersHistoryComponent {
  orders$: Observable<Order[]> = of([]);

  justPurchased: boolean = false;

  destroy$: Subject<void> = new Subject<void>();

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.pastOrders$;
  }

  ngOnInit(): void {
    this.orderService.getOrdersForComponents(this.destroy$);
  }

  showOrderStatusMessage() {
    this.justPurchased = true;
    setTimeout(() => {
      this.justPurchased = false;
    }, 2000);
  }

  cancelOrder(id: number) {
    if (
      confirm(
        'Are you sure you want to cancel order? This action cannot be undone.'
      )
    ) {
      this.orderService
        .cancelOrder(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  onChange(event: any) {
    const status: Status = event.target.value;
    if (status === 'COMPLETED') {
      this.orders$ = this.orderService.completedOrders$;
    } else if (status === 'CANCELLED') {
      this.orders$ = this.orderService.cancelledOrders$;
    } else if (status === 'PROCESSING') {
      this.orders$ = this.orderService.processingOrders$;
    } else {
      this.orders$ = this.orderService.pastOrders$;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
