import { Component } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Order, Status } from '../../models/order';
import { Customer, Role } from '../../models/customer';
import { Router } from '@angular/router';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css'],
})
export class OrdersHistoryComponent {
  orders$: Observable<Order[]> = of([]);

  TO_PROCESS = 'Orders To Process';
  PROCESSED_ORDERS = 'Processed Orders';
  textToDisplay: string = this.TO_PROCESS;
  routerLink: string = '/orders-history';

  destroy$: Subject<void> = new Subject<void>();

  role: Role = 'CUSTOMER';
  customer: Customer | undefined;

  constructor(private router: Router, private moduleFacade: ModuleFacade) {}

  ngOnInit(): void {
    const url = this.router.url;

    this.moduleFacade.userRole$
      .pipe(takeUntil(this.destroy$))
      .subscribe((role) => {
        this.role = role;
        if (role === 'CUSTOMER') {
          this.orders$ = this.moduleFacade.pastOrdersCustomer$;
        } else {
          if (url.includes('history')) {
            this.orders$ = this.moduleFacade.pastOrdersAdmin$;
            this.textToDisplay = this.TO_PROCESS;
            this.routerLink = '/orders-processing';
          } else {
            this.orders$ =
              this.moduleFacade.selectOrdersWithStatus('PROCESSING');
            this.textToDisplay = this.PROCESSED_ORDERS;
            this.routerLink = '/orders-history';
          }
        }
      });
  }

  showOrderStatusMessage(isAdmin: boolean) {
    if (isAdmin && this.customer) {
      // this.orderService.approvedOrCancelledOrder(orderId);
      this.router.navigateByUrl('/orders-history');
    }
  }

  cancelOrder(id: number) {
    if (
      confirm(
        'Are you sure you want to cancel order? This action cannot be undone.'
      )
    ) {
      this.moduleFacade.cancelOrder(id);
    }
  }

  approveOrder(id: number) {
    if (confirm('Are you sure you want to approve order?')) {
      this.moduleFacade.approveOrder(id);
    }
  }

  onChange(event: any) {
    const status: Status = event.target.value;
    if (status === 'COMPLETED') {
      this.orders$ = this.moduleFacade.selectOrdersWithStatus('COMPLETED');
    } else if (status === 'CANCELLED') {
      this.orders$ = this.moduleFacade.selectOrdersWithStatus('CANCELLED');
    } else if (status === 'PROCESSING') {
      this.orders$ = this.moduleFacade.selectOrdersWithStatus('PROCESSING');
    } else {
      this.orders$ = this.moduleFacade.selectOrdersWithStatus('FAILED');
    }
  }

  isAdmin() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
