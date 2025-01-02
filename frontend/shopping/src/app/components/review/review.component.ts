import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Review } from '../../models/review';
import { ModuleFacade } from '../../store/module.facade';
import { ReviewByProduct } from '../../models/review-customer-details';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  @Input() review: ReviewByProduct | undefined;

  @Input() rating: number = 1;
  @Input() fontSize: number = 20;
  starsArray = Array(5).fill(false);
  comment: string = '';
  touchedRating: boolean = false;

  customerId: number = 0;

  destroy$: Subject<void> = new Subject<void>();

  constructor(private moduleFacade: ModuleFacade) {}

  ngOnInit(): void {
    this.moduleFacade.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.customerId = user.id || 0;
    });

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
    this.rating = index + 1;
  }

  addReview() {
    const review: Review = {
      id: 0, //new review
      rating: this.rating,
      comment: this.comment,
      productId: this.review?.productId || 0,
      customerId: this.customerId, //default for now but later take from customerInfo (maybe in facade later on),
    };
    if (confirm('Are You sure you want to add this review?')) {
      this.moduleFacade.addReview(review);
      this.comment = '';
      this.rating = 1;
    }
  }

  get buttonDisabled() {
    return !this.touchedRating;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
