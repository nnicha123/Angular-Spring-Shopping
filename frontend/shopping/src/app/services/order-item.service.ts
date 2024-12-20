import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from '../models/orderItem';
import { URL } from '../utilities';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  url: string = URL + '/order-items';
  constructor(private httpClient: HttpClient) {}

  getOrderItems(): Observable<OrderItem[]> {
    return this.httpClient.get<OrderItem[]>(this.url);
  }

  getOrderItemsByOrderId(orderId: number): Observable<OrderItem[]> {
    const url = this.url + `/${orderId}`;
    return this.httpClient.get<OrderItem[]>(this.url);
  }
}
