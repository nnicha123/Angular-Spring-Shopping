import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './review.action';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review';
import { ReviewCustomerDetails } from '../../models/review-customer-details';
import { select, Store } from '@ngrx/store';
import { ModuleEntityState } from '../definitions/store.definitions';
import * as fromSelectors from '../module.selector';

@Injectable()
export class ReviewEffect {
  constructor(
    private actions$: Actions,
    private store: Store<{ module: ModuleEntityState }>,
    private reviewService: ReviewService
  ) {}

  loadReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadReviews),
      switchMap(({ productId }) => {
        return this.reviewService.getReviewsByProduct(productId).pipe(
          map((reviews: ReviewCustomerDetails[]) => {
            return fromActions.loadReviewsSuccess({ productId, reviews });
          })
        );
      })
    )
  );

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addReview),
      withLatestFrom(this.store.pipe(select(fromSelectors.selectUser))),
      switchMap(([{ review }, user]) => {
        const { imageUrl } = user;
        return this.reviewService.addReview(review).pipe(
          map(() => {
            const reviewCustomerDetails: ReviewCustomerDetails = {
              ...review,
              name: user.firstName + ' ' + user.lastName,
              imageUrl,
            };
            return fromActions.addReviewSuccess({
              review: reviewCustomerDetails,
            });
          })
        );
      })
    )
  );
}
