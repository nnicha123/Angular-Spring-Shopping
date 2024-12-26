import { Component } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css'],
})
export class OrdersHistoryComponent {
  processingOrders$: Observable<Order[]> = of([]);

  justPurchased: boolean = false;

  destroy$: Subject<void> = new Subject<void>();

  constructor(private orderService: OrderService, private router: Router) {
    this.processingOrders$ = this.orderService.processingOrders$;
  }

  ngOnInit(): void {}

  showOrderStatusMessage() {
    this.justPurchased = true;
    setTimeout(() => {
      this.justPurchased = false;
    }, 2000);
  }

  cancelOrder(){
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
