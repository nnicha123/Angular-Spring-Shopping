import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../utilities';
import { ReviewCustomerDetails } from '../models/review-customer-details';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  url: string = URL + '/review';

  constructor(private httpClient: HttpClient) {}

  getReviewsByCustomer(
    customerId: number
  ): Observable<ReviewCustomerDetails[]> {
    const url = this.url + `/customer/${customerId}`;
    return this.httpClient.get<ReviewCustomerDetails[]>(url);
  }

  getReviewsByProduct(productId: number): Observable<ReviewCustomerDetails[]> {
    const url = this.url + `/product/${productId}`;
    return this.httpClient.get<ReviewCustomerDetails[]>(url);
  }

  addReview(review: Review) {
    return this.httpClient.post<Review>(this.url, review);
  }
}
