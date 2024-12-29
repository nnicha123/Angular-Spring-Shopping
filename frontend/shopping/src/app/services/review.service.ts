import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
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
  reviews$ = new BehaviorSubject<ReviewCustomerDetails[] | null>([]);
  reviewsByProduct$ = new BehaviorSubject<ReviewByProduct[]>([]);
  apiCalled$ = new BehaviorSubject<boolean>(false);

  url: string = URL + '/review';

  constructor(private httpClient: HttpClient) {}

  addReviewByProduct(productId: number, reviews: ReviewCustomerDetails[]) {
    const reviewByProduct: ReviewByProduct = { productId, reviews };
    const updatedReviews: ReviewByProduct[] = [
      ...this.reviewsByProduct$.getValue(),
      reviewByProduct,
    ];
    this.reviewsByProduct$.next(updatedReviews);
  }

  addReviewToList(review: ReviewCustomerDetails): ReviewCustomerDetails[] {
    const updatedReviews: ReviewCustomerDetails[] = [
      ...this.getReviews(),
      review,
    ];
    return updatedReviews;
  }

  setReviews(reviews: ReviewCustomerDetails[]) {
    this.reviews$.next(reviews);
  }

  getReviews(): ReviewCustomerDetails[] {
    return this.reviews$.getValue() || [];
  }

  reviewsAvailableForProduct(productId: number): boolean {
    const reviewsByProduct: ReviewByProduct | undefined = this.reviewsByProduct$
      .getValue()
      .find((reviews) => reviews.productId === productId);
    return reviewsByProduct != undefined;
  }

  markApiCalled() {
    this.apiCalled$.next(true);
  }

  markApiCalledFalse() {
    this.apiCalled$.next(false);
  }

  apiHasBeenCalled(): boolean {
    return this.apiCalled$.getValue();
  }

  getReviewsByCustomer(
    customerId: number
  ): Observable<ReviewCustomerDetails[]> {
    const url = this.url + `/customer/${customerId}`;
    return this.httpClient.get<ReviewCustomerDetails[]>(url);
  }

  getReviewsByProduct(productId: number): Observable<ReviewCustomerDetails[]> {
    const url = this.url + `/product/${productId}`;
    return this.httpClient.get<ReviewCustomerDetails[]>(url).pipe(
      tap((reviews) => {
        this.reviews$.next(reviews);
        this.addReviewByProduct(productId, reviews);
        this.markApiCalled();
      })
    );
  }

  getCachedReviewByProduct(
    productId: number
  ): Observable<ReviewCustomerDetails[] | undefined> {
    console.log(this.reviewsByProduct$.getValue());
    return this.reviewsByProduct$.pipe(
      map((reviews) => {
        return reviews.find((review) => review.productId === productId)
          ?.reviews;
      })
    );
  }

  addReview(review: Review) {
    return this.httpClient.post<Review>(this.url, review).pipe(
      tap(() => {
        this.markApiCalledFalse();
      })
    );
  }
}
