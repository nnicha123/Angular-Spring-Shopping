import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { URL } from '../utilities';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = URL + '/products';
  constructor(private httpClient: HttpClient) {}

  getProductById(id: number): Observable<Product> {
    const url: string = this.url + `/${id}`;
    return this.httpClient.get<Product>(url);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  addProduct(newProduct: Product): Observable<void> {
    return this.httpClient.post<void>(this.url, newProduct);
  }

  updateProduct(updatedProduct: Product): Observable<void> {
    return this.httpClient.put<void>(this.url, updatedProduct);
  }
}
