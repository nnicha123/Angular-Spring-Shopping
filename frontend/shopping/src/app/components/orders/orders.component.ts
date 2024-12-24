import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  totalPrice: number = 0;
  quantity: number = 0;
  maxQuantity: number = 10;
  minQuantity: number = 1;
  justPurchased: boolean = false;

  tempProducts: any[] = [
    {
      productId: 1,
      name: 'Tooth Brush New Price!',
      imageUrl: 'baby-pink.jpg',
      quantity: 2,
      price: 40,
    },
    {
      productId: 2,
      name: 'Keyboard',
      imageUrl: 'lip-bright-pink.jpg',
      quantity: 3,
      price: 33,
    },
    {
      productId: 3,
      name: 'Hair Gel',
      imageUrl: 'lip-gloss.jpg',
      quantity: 2,
      price: 10,
    },
  ];

  ngOnInit(): void {
    this.calculateTotalPrice(this.tempProducts);
  }

  // Later when get this info, will call this function after basket info retrieved
  calculateTotalPrice(products: any[]) {
    this.totalPrice = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  quantityUpdate(quantity: number, index: number) {
    if (quantity === 0) {
      this.tempProducts.splice(index, 1);
    } else {
      this.tempProducts[index].quantity = quantity;
    }
    this.calculateTotalPrice(this.tempProducts);
  }
}
