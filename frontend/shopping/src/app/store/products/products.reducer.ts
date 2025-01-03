import { on, ReducerTypes } from '@ngrx/store';
import {
  moduleEntityAdapter,
  ModuleEntityState,
} from '../definitions/store.definitions';
import * as fromActions from './products.action';
import { getData, getProducts, initialModuleData } from '../utils';
import { Product } from '../../models/product';

export function productsReducer(): ReducerTypes<ModuleEntityState, any>[] {
  return [
    on(fromActions.loadProducts, (state, action) => {
      return {
        ...moduleEntityAdapter.addOne(
          {
            data: {
              ...initialModuleData,
            },
            isLoggedIn: false,
            status: 'loading',
            products: [],
          },
          state
        ),
      };
    }),
    on(fromActions.loadProductsSuccess, (state, action) => {
      const data = getData(state);
      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
              },
              status: 'ready',
              products: [...action.products],
            },
          },
          state
        ),
      };
    }),
    on(fromActions.addProduct, fromActions.updateProduct, (state, action) => {
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
    on(fromActions.addProductSuccess, (state, action) => {
      const products = getProducts(state);
      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              products: [...products, action.product],
              status: 'ready',
            },
          },
          state
        ),
      };
    }),
    on(fromActions.updateProductSuccess, (state, action) => {
      let updatedProducts = getProducts(state).map((product: Product) => {
        return product.id === action.product.id ? action.product : product;
      });

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              products: [...updatedProducts],
              status: 'ready',
            },
          },
          state
        ),
      };
    }),
  ];
}
