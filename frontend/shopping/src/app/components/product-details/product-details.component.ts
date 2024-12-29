import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderItemFront } from '../../models/orderItem';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id: number = 0;
  destroy$: Subject<void> = new Subject<void>();
  quantity: number = 1;
  maxQuantity: number = 10;
  minQuantity: number = 1;
  product$!: Observable<Product | undefined>;

  constructor(
    private productService: ProductsService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.id = +(params.get('id') || 0);
      this.product$ = this.productService.getProduct$(this.id);
    });
  }

  updateQuantity(instruction: string) {
    if (instruction === 'increment') {
      this.quantity += 1;
    } else {
      this.quantity -= 1;
    }
  }

  addToBasket(product: Product) {
    const { name, imageUrl, price } = product;
    const orderItem: OrderItemFront = {
      productId: this.id,
      quantity: this.quantity,
      name,
      imageUrl,
      price,
    };
    this.orderService.addOrderItem(orderItem);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
