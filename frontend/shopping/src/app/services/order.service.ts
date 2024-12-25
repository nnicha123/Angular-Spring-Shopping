import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../models/order';
import { URL } from '../utilities';
import { OrderItemFront } from '../models/orderItem';
import { ProductsService } from './products.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders$ = new BehaviorSubject<Order[]>([]);

  currentOrder$ = new BehaviorSubject<Order | null>(null);

  apiCalled$ = new BehaviorSubject<boolean>(false);

  url: string = URL + '/orders';

  constructor(
    private httpClient: HttpClient,
    private productService: ProductsService
  ) {}

  markApiAsCalled(): void {
    this.apiCalled$.next(true);
  }

  hasApiBeenCalled(): boolean {
    return this.apiCalled$.getValue();
  }

  setOrders(orders: Order[]): void {
    const ordersToSet = orders.map((order) => {
      return {
        ...order,
        orderItems: order.orderItems.map((item) => {
          return {
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            ...this.getProductById(item.productId),
          };
        }),
      };
    });

    this.orders$.next(ordersToSet);

    // Setup current order -> Find status of 'PENDING'
    const currentOrder: Order | undefined = this.orders$
      .getValue()
      .find((order) => order.status === 'PENDING');
    if (currentOrder) {
      this.setCurrentOrder(currentOrder);
    }
  }

  getProductById(productId: number): {
    name: string;
    imageUrl: string;
    price: number;
  } {
    const { name, imageUrl, price } =
      this.productService.getProductById(productId);
    return { name, imageUrl, price };
  }

  setCurrentOrder(order: Order): void {
    this.currentOrder$.next(order);
  }

  addOrderItem(orderItem: OrderItemFront): void {
    let order = this.currentOrder$.getValue();
    if (order) {
      const currentItems = order.orderItems;
      let updatedOrderItems = [...currentItems];
      const existingProductIndex = currentItems.findIndex(
        (item) => item.productId === orderItem.productId
      );
      if (existingProductIndex === -1) {
        updatedOrderItems = [...updatedOrderItems, orderItem];
      } else {
        updatedOrderItems[existingProductIndex].quantity += orderItem.quantity;
      }
      order.orderItems = [...updatedOrderItems];
    } else {
      order = this.initializeOrder();
      order.orderItems.push(orderItem);
    }
    this.updateOrderFromOrderItems(order);
  }

  initializeOrder(): Order {
    const newOrder: Order = {
      status: 'PENDING',
      totalPrice: 0,
      totalQuantity: 0,
      customerId: 3, //temp customerId
      orderItems: [],
    };
    return newOrder;
  }

  updateOrderItemQuantity(quantity: number, index: number) {
    const order = this.currentOrder$.getValue();
    if (order) {
      const orderItems = [...order.orderItems];
      if (quantity === 0) {
        orderItems.splice(index, 1);
      } else {
        orderItems[index].quantity = quantity;
      }
      order.orderItems = orderItems;
      this.updateOrderFromOrderItems(order);
    }
  }

  removeOrderItem(itemId: number): void {
    const order = this.currentOrder$.getValue();
    if (order) {
      const orderItems = [...order.orderItems].splice(itemId, 1);
      order.orderItems = orderItems;
      this.updateOrderFromOrderItems(order);
    }
  }

  updateOrderFromOrderItems(order: Order) {
    const { totalPrice, totalQuantity } = this.updateTotal(order.orderItems);

    const updatedOrder: Order = {
      ...order,
      totalPrice,
      totalQuantity,
    };

    this.currentOrder$.next(updatedOrder);
  }

  updateTotal(orderItems: OrderItemFront[]) {
    const totalPrice = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const totalQuantity = orderItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return { totalPrice, totalQuantity };
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url);
  }

  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    const url = this.url + `/customer/${customerId}`;
    return this.httpClient.get<Order[]>(url);
  }

  updateOrderById(id: number, updatedOrder: Order): Observable<void> {
    const url = this.url + `/${id}`;
    return this.httpClient.put<void>(url, updatedOrder);
  }

  saveOrder(): Observable<void> {
    const order: Order | null = this.currentOrder$.getValue();
    if (order) {
      return this.httpClient.post<void>(this.url, order);
    }
    return of();
  }

  purchaseOrder(): Observable<void> {
    let order: Order | null = this.currentOrder$.getValue();
    if (order) {
      order.status = 'PROCESSING';
      return this.httpClient.post<void>(this.url, order);
    }
    return of();
  }
}
