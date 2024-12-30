import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Order } from '../../models/order';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent {
  justPurchased: boolean = false;

  destroy$: Subject<void> = new Subject<void>();
  currentOrder$: Observable<Order | undefined> = of(undefined);

  customer: Customer | undefined;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentOrder$ = this.orderService.currentOrder$;
  }

  ngOnInit(): void {
    const customer = this.authService.getCustomer();
    if (customer) {
      this.customer = customer;
      this.orderService.getAndSetupOrders(customer, this.destroy$);
    }
  }

  quantityUpdate(quantity: number, index: number) {
    this.orderService.updateOrderItemQuantity(quantity, index);
  }

  saveOrder() {
    this.orderService
      .saveOrder()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.showOrderStatusMessage());
  }

  purchaseOrder() {
    this.orderService
      .purchaseOrder()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.purchaseResponse();
      });
  }

  purchaseResponse() {
    this.justPurchased = true;
    setTimeout(() => {
      this.justPurchased = false;
      if (this.customer) {
        this.orderService.purchased();
        this.router.navigateByUrl('/orders-history');
      }
    }, 2000);
  }

  showOrderStatusMessage() {
    this.justPurchased = true;
    setTimeout(() => {
      this.justPurchased = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
