import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Observable, of } from 'rxjs';
import { Customer } from '../../models/customer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  customer$: Observable<Customer | null> = of(null);
  addingProduct: boolean = false;

  constructor(
    private authService: AuthService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
    this.customer$ = this.authService.customer$;
  }

  onClose() {
    this.addingProduct = false;
  }
}
