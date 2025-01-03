import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './review.action';
import * as fromProductsActions from '../products/products.action';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { ReviewService } from '../../services/review.service';
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

  loadProductsSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductsActions.loadProductsSuccess),
      switchMap(() => {
        return [fromActions.loadReviews()];
      })
    )
  );

  loadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadReviews),
      switchMap(() => {
        return this.reviewService.getAllReviews().pipe(
          map((reviews: ReviewCustomerDetails[]) => {
            return fromActions.loadReviewsSuccess({ reviews });
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

  deleteReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteReview),
      switchMap(({ review }) => {
        return this.reviewService
          .deleteReview(review.id)
          .pipe(map(() => fromActions.deleteReviewSuccess({ review })));
      })
    )
  );
}
