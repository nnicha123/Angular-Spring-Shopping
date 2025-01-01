import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, Status } from '../models/order';
import { URL } from '../utilities';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url: string = URL + '/orders';

  constructor(private httpClient: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url);
  }

  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    const url = this.url + `/customer/${customerId}`;
    return this.httpClient.get<Order[]>(url);
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
