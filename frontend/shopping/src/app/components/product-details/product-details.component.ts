import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id: number = 0;
  product$: Observable<Product> = of();
  destroy$: Subject<void> = new Subject<void>();
  quantity: number = 1;
  maxQuantity: number = 10;
  minQuantity: number = 1;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => (this.id = +(params.get('id') || 0)));
  }

  ngOnInit(): void {
    this.product$ = this.productService.getProductById(this.id);
  }

  updateQuantity(instruction: string) {
    if (instruction === 'increment') {
      this.quantity += 1;
    } else {
      this.quantity -= 1;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}