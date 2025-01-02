import { on, ReducerTypes } from '@ngrx/store';
import {
  moduleEntityAdapter,
  ModuleEntityState,
} from '../definitions/store.definitions';
import * as fromActions from './review.action';
import { getProducts } from '../utils';
import { ReviewCustomerDetails } from '../../models/review-customer-details';

export function reviewReducer(): ReducerTypes<ModuleEntityState, any>[] {
  return [
    on(fromActions.loadReviews, fromActions.addReview, (state, action) => {
      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              status: 'loading',
            },
          },
          state
        ),
      };
    }),
    on(fromActions.loadReviewsSuccess, (state, action) => {
      const reviews = action.reviews;
      let products = getProducts(state);
      products = products.map((product) => {
        let productReviews = reviews.filter(
          (review) => review.productId === product.id
        );
        product.review = {
          ...product.review,
          productId: product.id,
          reviews: productReviews,
          avgRating: calcAvgRating(productReviews),
        };
        return product;
      });

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              status: 'ready',
              products,
            },
          },
          state
        ),
      };
    }),
    on(fromActions.addReviewSuccess, (state, action) => {
      const newReview = action.review;
      const productId = action.review.productId;
      let products = getProducts(state);
      products = products.map((product) => {
        if (product.id === productId) {
          product.review = {
            ...product.review,
            reviews: [...product.review.reviews, newReview],
            avgRating: calcAvgRating([...product.review.reviews, newReview]),
          };
        }
        return product;
      });

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              status: 'ready',
              products,
            },
          },
          state
        ),
      };
    }),
  ];
}

function calcAvgRating(reviews: ReviewCustomerDetails[]): number {
  if (reviews.length === 0) return 0;
  const ratingSum = reviews.reduce(
    (total, reviews) => total + reviews.rating,
    0
  );
  return Math.ceil(ratingSum / reviews.length);
}
