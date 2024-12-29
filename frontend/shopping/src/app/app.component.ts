import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';

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
    private productsService: ProductsService
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
      });
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
