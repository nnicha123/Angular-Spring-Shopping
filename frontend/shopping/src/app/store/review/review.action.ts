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
  DELETE_REVIEW = '[Review] Delete Review',
  DELETE_REVIEW_SUCCESS = '[Review] Delete Review Success',
  DELETE_REVIEW_ERROR = '[Review] Delete Review Error',
}

export const loadReviews = createAction(ReviewActions.LOAD_REVIEWS);

export const loadReviewsSuccess = createAction(
  ReviewActions.LOAD_REVIEWS_SUCCESS,
  props<{ reviews: ReviewCustomerDetails[] }>()
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

export const deleteReview = createAction(
  ReviewActions.DELETE_REVIEW,
  props<{ review: ReviewCustomerDetails }>()
);

export const deleteReviewSuccess = createAction(
  ReviewActions.DELETE_REVIEW_SUCCESS,
  props<{ review: ReviewCustomerDetails }>()
);

export const deleteReviewError = createAction(
  ReviewActions.DELETE_REVIEW_ERROR,
  props<{ error: any }>()
);
