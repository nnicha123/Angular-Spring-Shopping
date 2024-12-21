import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { URL } from '../utilities';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  url: string = URL + '/review';

  constructor(private httpClient: HttpClient) {}

  getReviewsByCustomer(customerId: number): Observable<Review[]> {
    const url = this.url + `/customer/${customerId}`;
    return this.httpClient.get<Review[]>(url);
  }

  getReviewsByProduct(productId: number): Observable<Review[]> {
    const url = this.url + `/product/${productId}`;
    return this.httpClient.get<Review[]>(url);
  }
}
