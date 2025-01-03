import { Component } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Order, Status } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Customer, Role } from '../../models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css'],
})
export class OrdersHistoryComponent {
  orders$: Observable<Order[]> = of([]);

  cancellable: boolean = true;

  TO_PROCESS = 'Orders To Process';
  PROCESSED_ORDERS = 'Processed Orders';
  textToDisplay: string = this.TO_PROCESS;
  routerLink: string = '/orders-history';

  destroy$: Subject<void> = new Subject<void>();

  role: Role = 'CUSTOMER';
  customer: Customer | undefined;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customer = this.authService.getCustomer();
    const url = this.router.url;
    this.role = customer?.role || 'CUSTOMER';
    if (customer) {
      this.customer = customer;
      this.orderService.getAndSetupOrders(customer, this.destroy$);
      if (customer.role === 'CUSTOMER') {
        this.orders$ = this.orderService.pastOrders$;
      } else {
        if (url.includes('history')) {
          this.orders$ = this.orderService.adminFinishedOrders$;
          this.textToDisplay = this.TO_PROCESS;
          this.routerLink = '/orders-processing';
        } else {
          this.orders$ = this.orderService.adminProcessingOrders$;
          this.textToDisplay = this.PROCESSED_ORDERS;
          this.routerLink = '/orders-history';
        }
      }
    }
  }

  showOrderStatusMessage(orderId: number, isAdmin: boolean) {
    if (isAdmin && this.customer) {
      this.orderService.approvedOrCancelledOrder(orderId);
      this.router.navigateByUrl('/orders-history');
    }
  }

  cancelOrder(id: number) {
    const isAdmin = this.role === 'ADMIN';
    if (
      confirm(
        'Are you sure you want to cancel order? This action cannot be undone.'
      )
    ) {
      this.orderService
        .cancelOrder(id, isAdmin)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.showOrderStatusMessage(id, isAdmin);
        });
    }
  }

  approveOrder(id: number) {
    if (confirm('Are you sure you want to approve order?')) {
      this.orderService
        .approveOrder(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.showOrderStatusMessage(id, true);
        });
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

  isAdmin() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
