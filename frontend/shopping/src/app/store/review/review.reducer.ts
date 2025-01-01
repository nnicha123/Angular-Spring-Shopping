import { on, ReducerTypes } from '@ngrx/store';
import {
  moduleEntityAdapter,
  ModuleEntityState,
} from '../definitions/store.definitions';
import * as fromActions from './review.action';
import { getProducts } from '../utils';

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
      const productId = action.productId;
      let products = getProducts(state);
      products = products.map((product) => {
        if (product.id === productId) {
          product.reviews = reviews;
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
    on(fromActions.addReviewSuccess, (state, action) => {
      const review = action.review;
      const productId = action.review.productId;
      let products = getProducts(state);
      products = products.map((product) => {
        if (product.id === productId) {
          product.reviews = [...product.reviews, review];
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
