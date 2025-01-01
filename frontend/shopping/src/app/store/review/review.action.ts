import { createAction, props } from '@ngrx/store';
import { Review } from '../../models/review';
import { ReviewCustomerDetails } from '../../models/review-customer-details';

enum ReviewActions {
  LOAD_REVIEWS = '[Review] Load Reviews',
  LOAD_REVIEWS_SUCCESS = '[Review] Load Reviews Success',
  LOAD_REVIEWS_ERROR = '[Review] Load Reviews Error',
  ADD_REVIEW = '[Review] Add Review',
  ADD_REVIEW_SUCCESS = '[Review] Add Review Success',
  ADD_REVIEW_ERROR = '[Review] Add Review Error',
}

export const loadReviews = createAction(
  ReviewActions.LOAD_REVIEWS,
  props<{ productId: number }>()
);

export const loadReviewsSuccess = createAction(
  ReviewActions.LOAD_REVIEWS_SUCCESS,
  props<{ productId: number; reviews: ReviewCustomerDetails[] }>()
);

export const loadReviewsError = createAction(
  ReviewActions.LOAD_REVIEWS_ERROR,
  props<{ errors: any }>()
);

export const addReview = createAction(
  ReviewActions.ADD_REVIEW,
  props<{ review: Review }>()
);

export const addReviewSuccess = createAction(
  ReviewActions.ADD_REVIEW_SUCCESS,
  props<{ review: ReviewCustomerDetails }>()
);

export const addReviewError = createAction(
  ReviewActions.ADD_REVIEW_ERROR,
  props<{ errors: any }>()
);
