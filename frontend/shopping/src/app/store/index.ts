import {
  loginUser,
  loginUserError,
  loginUserSuccess,
} from './auth/auth.action';
import { AuthEffect } from './auth/auth.effect';
import { moduleReducer } from './module.reducer';
import {
  loadOrdersError,
  loadOrdersForAdmin,
  loadOrdersForCustomer,
  loadOrdersSuccess,
} from './orders/orders.action';
import { OrdersEffect } from './orders/orders.effect';
import {
  loadProducts,
  loadProductsError,
  loadProductsSuccess,
} from './products/products.action';
import { ProductsEffect } from './products/products.effect';

const actions = {
  loginUser: loginUser,
  loginUserSuccess: loginUserSuccess,
  loginUserError: loginUserError,
  loadProducts: loadProducts,
  loadProductsSuccess: loadProductsSuccess,
  loadProductsError: loadProductsError,
  loadOrdersForAdmin: loadOrdersForAdmin,
  loadOrdersForCustomer: loadOrdersForCustomer,
  loadOrdersSuccess: loadOrdersSuccess,
  loadOrdersError: loadOrdersError,
};

const effects: any[] = [AuthEffect, ProductsEffect, OrdersEffect];

export { actions, effects, moduleReducer };
