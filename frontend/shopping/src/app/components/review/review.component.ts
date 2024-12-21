import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Observable, of } from 'rxjs';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Input() productId: number = 0;
  reviews$: Observable<Review[]> = of([]);
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviews$ = this.reviewService.getReviewsByProduct(this.productId);
  }
}
