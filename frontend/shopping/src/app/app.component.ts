import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';
import { OrderService } from './services/order.service';
import { Customer } from './models/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private productsService: ProductsService,
    private orderService: OrderService
  ) {}

  title = 'shopping';
  ngOnInit(): void {
    this.checkAuth();
    this.getProducts();
  }

  checkAuth() {
    if (this.authService.userLoggedIn()) {
      this.authService.setLoggedIn(true);
      this.getCustomer(this.authService.getCustomerId());
    }
  }

  getCustomer(customerId: number) {
    this.customerService
      .getCustomerById(customerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((customer) => {
        this.authService.setCustomer(customer);
        this.getOrders(customer);
      });
  }

  getOrders(customer: Customer) {
    console.log(this.orderService.hasApiBeenCalled());
    if (!this.orderService.hasApiBeenCalled()) {
      if (customer.role === 'CUSTOMER' && customer.id) {
        this.orderService
          .getOrdersByCustomerId(customer.id)
          .pipe(
            takeUntil(this.destroy$),
            tap((orders) => {
              this.orderService.markApiAsCalled();
              this.orderService.setOrders(orders);
            })
          )
          .subscribe();
      } else {
        this.orderService.getAllOrders().pipe(
          takeUntil(this.destroy$),
          tap((orders) => {
            this.orderService.setOrdersForAdmin(orders);
            this.orderService.markApiAsCalled();
          })
        );
      }
    }
  }

  getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => this.productsService.setProducts(products));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
