import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private orderService: OrderService
  ) {}

  title = 'shopping';
  ngOnInit(): void {
    this.getProducts();
    this.getOrders();
  }

  getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => this.productsService.setProducts(products));
  }

  getOrders() {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
