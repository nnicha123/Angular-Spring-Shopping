import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';

enum ProductsActions {
  LOAD_PRODUCTS = '[Products] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success',
  LOAD_PRODUCTS_ERROR = '[Products] Load Products Error',
  ADD_PRODUCT = '[Products] Add Products',
  ADD_PRODUCT_SUCCESS = '[Products] Add Products Success',
  ADD_PRODUCT_ERROR = '[Products] Add Products Error',
}

export const loadProducts = createAction(ProductsActions.LOAD_PRODUCTS);

export const loadProductsSuccess = createAction(
  ProductsActions.LOAD_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const loadProductsError = createAction(
  ProductsActions.LOAD_PRODUCTS_ERROR,
  props<{ error: any }>()
);

export const addProduct = createAction(
  ProductsActions.ADD_PRODUCT,
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  ProductsActions.ADD_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);

export const addProductError = createAction(
  ProductsActions.ADD_PRODUCT_ERROR,
  props<{ error: any }>()
);
