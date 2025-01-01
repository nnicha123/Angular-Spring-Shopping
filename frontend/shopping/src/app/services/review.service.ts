import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../utilities';
import {
  ReviewByProduct,
  ReviewCustomerDetails,
} from '../models/review-customer-details';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  url: string = URL + '/review';

  constructor(private httpClient: HttpClient) {}

  getReviewsByProduct(productId: number): Observable<ReviewCustomerDetails[]> {
    const url = this.url + `/product/${productId}`;
    return this.httpClient.get<ReviewCustomerDetails[]>(url);
  }

  addReview(review: Review) {
    return this.httpClient.post<void>(this.url, review);
  }
}
