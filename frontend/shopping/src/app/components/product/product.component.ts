import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  addingProduct: boolean = false;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  onClose() {
    this.addingProduct = false;
  }
}
