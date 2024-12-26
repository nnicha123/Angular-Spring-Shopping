import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private productsService: ProductsService
  ) {}

  title = 'shopping';
  ngOnInit(): void {
    this.checkAuth();
    this.getProducts();
    // this.getOrders();
  }

  checkAuth() {
    if (this.authService.userLoggedIn()) {
      this.authService.setLoggedIn(true);
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
