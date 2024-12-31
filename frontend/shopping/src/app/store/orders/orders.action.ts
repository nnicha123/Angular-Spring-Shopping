import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order';

enum OrderActions {
  LOAD_ORDERS_FOR_ADMIN = '[Orders] Load Orders for Admin',
  LOAD_ORDERS_FOR_CUSTOMER = '[Orders] Load Orders for Customer',
  LOAD_ORDERS_SUCCESS = '[Orders] Load Orders Success',
  LOAD_ORDERS_ERROR = '[Orders] Load Orders Error',
}

export const loadOrdersForAdmin = createAction(OrderActions.LOAD_ORDERS_FOR_ADMIN);

export const loadOrdersForCustomer = createAction(
  OrderActions.LOAD_ORDERS_FOR_CUSTOMER,
  props<{ customerId: number }>()
);

export const loadOrdersSuccess = createAction(
  OrderActions.LOAD_ORDERS_SUCCESS,
  props<{ orders: Order[] }>()
);

export const loadOrdersError = createAction(
  OrderActions.LOAD_ORDERS_ERROR,
  props<{ errors: any }>()
);
