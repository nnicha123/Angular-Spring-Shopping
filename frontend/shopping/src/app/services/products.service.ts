import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { URL } from '../utilities';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products$ = new BehaviorSubject<Product[]>([]);

  url: string = URL + '/products';
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  addProduct(newProduct: Product): Observable<void> {
    return this.httpClient.post<void>(this.url, newProduct);
  }
}
