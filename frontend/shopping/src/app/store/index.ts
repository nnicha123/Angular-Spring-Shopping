import {
  loginUser,
  loginUserError,
  loginUserSuccess,
} from './auth/auth.action';
import { AuthEffect } from './auth/auth.effect';
import { moduleReducer } from './module.reducer';
import {
  approveOrder,
  approveOrderError,
  approveOrderSuccess,
  cancelOrder,
  cancelOrderError,
  cancelOrderSuccess,
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
import { ReviewEffect } from './review/review.effect';

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
  cancelOrder: cancelOrder,
  cancelOrderSuccess: cancelOrderSuccess,
  cancelOrderError: cancelOrderError,
  approveOrder: approveOrder,
  approveOrderSuccess: approveOrderSuccess,
  approveOrderError: approveOrderError,
};

const effects: any[] = [AuthEffect, ProductsEffect, OrdersEffect, ReviewEffect];

export { actions, effects, moduleReducer };
