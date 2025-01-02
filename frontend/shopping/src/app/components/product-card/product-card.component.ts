import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  showFullText = false;

  rating: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.rating = this.product?.review?.avgRating || 0;
  }

  toggleShowFullText() {
    this.showFullText = !this.showFullText;
  }
}
