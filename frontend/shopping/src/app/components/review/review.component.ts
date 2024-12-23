import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Observable, of } from 'rxjs';
import { Review } from '../../models/review';
import { ReviewCustomerDetails } from '../../models/review-customer-details';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Input() productId: number = 0;
  reviews$: Observable<ReviewCustomerDetails[]> = of([]);

  @Input() rating: number = 0;
  @Input() fontSize: number = 20;
  starsArray = Array(5).fill(false);

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
    this.rating = index;
  }
}
