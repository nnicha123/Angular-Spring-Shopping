import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/order';
import { URL } from '../utilities';
import { OrderItem, OrderItemFront } from '../models/orderItem';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders$ = new BehaviorSubject<Order | null>(null);
  orderItems$ = new BehaviorSubject<OrderItemFront[]>([]);

  url: string = URL + '/orders';

  constructor(private httpClient: HttpClient) {}

  setOrder(order: Order): void {
    this.orders$.next(order);
  }

  addOrderItem(orderItem: OrderItemFront): void {
    const updatedOrderItems = [...this.orderItems$.getValue(), orderItem];
    this.orderItems$.next(updatedOrderItems);
    this.updateOrderFromOrderItems(updatedOrderItems);
  }

  updateOrderItemQuantity(quantity: number, index: number) {
    const orderItems = [...this.orderItems$.getValue()];
    if (quantity === 0) {
      orderItems.splice(index, 1);
    } else {
      orderItems[index].quantity = quantity;
    }
    this.orderItems$.next(orderItems);
    this.updateOrderFromOrderItems(orderItems);
  }

  updateOrderFromOrderItems(updatedOrderItems: OrderItemFront[]) {
    const { totalPrice, totalQuantity } = this.updateTotal(updatedOrderItems);

    const order: Order = {
      status: 'PENDING',
      totalPrice,
      totalQuantity,
      customerId: 3, //temp customerId
      orderItems: updatedOrderItems,
    };

    this.orders$.next(order);
  }

  removeOrderItem(itemId: number): void {
    const orderItems = [...this.orderItems$.getValue()].splice(itemId, 1);
    this.orderItems$.next(orderItems);
    this.updateOrderFromOrderItems(orderItems);
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

  addOrder(
    orderItems: OrderItem[],
    customerId: number,
    totalPrice: number,
    totalQuantity: number
  ): Observable<void> {
    const order: Order = {
      customerId,
      orderItems,
      totalPrice,
      totalQuantity,
      status: 'PENDING',
    };
    return this.httpClient.post<void>(this.url, order);
  }
}
