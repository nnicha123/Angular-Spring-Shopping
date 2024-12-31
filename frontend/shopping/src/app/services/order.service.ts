import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Order, Status } from '../models/order';
import { URL } from '../utilities';
import { OrderItemFront } from '../models/orderItem';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url: string = URL + '/orders';

  constructor(private httpClient: HttpClient) {}

  addOrderItem(orderItem: OrderItemFront): void {}

  initializeOrder(): Order {
    const newOrder: Order = {
      status: 'PENDING',
      totalPrice: 0,
      totalQuantity: 0,
      customerId: +(localStorage.getItem('customerId') || 0),
      orderItems: [],
    };
    return newOrder;
  }

  updateOrderItemQuantity(quantity: number, index: number, order: Order) {
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

  removeOrderItem(itemId: number, order: Order): void {
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

  getAllOrders(): Observable<Order[]> {
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

  saveOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.url, order);
  }

  purchaseOrder(order: Order): Observable<Order> {
    const updatedOrder = {
      ...order,
      status: 'PROCESSING',
    };
    return this.httpClient.post<Order>(this.url, updatedOrder);
  }

  updateOrder(order: Order, status: Status): Observable<Order | null> {
    const updatedOrder = {
      ...order,
      status,
    };
    return this.httpClient.post<Order>(this.url, updatedOrder);
  }
}
