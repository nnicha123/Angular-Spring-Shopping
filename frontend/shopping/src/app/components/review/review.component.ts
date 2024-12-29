import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Review } from '../../models/review';
import { ReviewCustomerDetails } from '../../models/review-customer-details';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  @Input() productId: number = 0;
  reviews$: Observable<ReviewCustomerDetails[] | undefined> = of([]);

  @Input() rating: number = 1;
  @Input() fontSize: number = 20;
  starsArray = Array(5).fill(false);
  comment: string = '';
  touchedRating: boolean = false;

  customerId: number = 0;

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.reviewService.reviewsAvailableForProduct(this.productId)) {
      this.reviews$ = this.reviewService.getReviewsByProduct(this.productId);
    } else {
      this.reviews$ = this.reviewService.getCachedReviewByProduct(
        this.productId
      );
    }
    this.starsArray[0] = true;
    this.customerId = this.authService.getCustomerId();
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
    this.rating = index + 1;
  }

  addReview() {
    const review: Review = {
      id: 0, //new review
      rating: this.rating,
      comment: this.comment,
      productId: this.productId,
      customerId: this.customerId, //default for now but later take from customerInfo (maybe in facade later on),
    };
    if (confirm('Are You sure you want to add this review?')) {
      return this.reviewService
        .addReview(review)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => window.location.reload());
    }
    return;
  }

  get buttonDisabled() {
    return !this.touchedRating;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
