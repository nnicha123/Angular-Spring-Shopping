import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Review } from '../../models/review';
import { ReviewCustomerDetails } from '../../models/review-customer-details';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  @Input() productId: number = 0;
  reviews$: Observable<ReviewCustomerDetails[]> = of([]);

  @Input() rating: number = 0;
  @Input() fontSize: number = 20;
  starsArray = Array(5).fill(false);
  comment: string = '';
  touchedRating: boolean = false;

  destroy$: Subject<void> = new Subject<void>();

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviews$ = this.reviewService.getReviewsByProduct(this.productId);
    this.starsArray[0] = true;
  }

  changeRating(index: number) {
    // case incrementing stars
    for (let i = 0; i <= index; i++) {
      this.starsArray[i] = true;
    }
    // decrementing
    for (let i = 4; i > index; i--) {
      this.starsArray[i] = false;
    }
    this.touchedRating = true;
    this.rating = index;
  }

  addReview() {
    const review: Review = {
      id: 0, //new review
      rating: this.rating,
      comment: this.comment,
      productId: this.productId,
      customerId: 3, //default for now but later take from customerInfo (maybe in facade later on),
    };
    return this.reviewService
      .addReview(review)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  get buttonDisabled() {
    return !this.touchedRating;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
