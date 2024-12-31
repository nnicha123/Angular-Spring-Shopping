import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order';
import { OrderItemFront } from '../../models/orderItem';

enum OrderActions {
  LOAD_ORDERS_FOR_ADMIN = '[Orders] Load Orders for Admin',
  LOAD_ORDERS_FOR_CUSTOMER = '[Orders] Load Orders for Customer',
  LOAD_ORDERS_SUCCESS = '[Orders] Load Orders Success',
  LOAD_ORDERS_ERROR = '[Orders] Load Orders Error',
  CANCEL_ORDER = '[Orders] Cancel Order',
  CANCEL_ORDER_SUCCESS = '[Orders] Cancel Order Success',
  CANCEL_ORDER_ERROR = '[Orders] Cancel Order Error',
  APPROVE_ORDER = '[Orders] Approve Order',
  APPROVE_ORDER_SUCCESS = '[Orders] Approve Order Success',
  APPROVE_ORDER_ERROR = '[Orders] Approve Order Error',
  SAVE_ORDER = '[Orders] Save Order',
  SAVE_ORDER_SUCCESS = '[Orders] Save Order Success',
  SAVE_ORDER_ERROR = '[Orders] Save Order Error',
  PURCHASE_ORDER = '[Orders] Purchase Order',
  PURCHASE_ORDER_SUCCESS = '[Orders] Purchase Order Success',
  PURCHASE_ORDER_ERROR = '[Orders] Purchase Order Error',
  UPDATE_ORDER_ITEMS = '[Orders] Update Order Items',
  UPDATE_ORDER_ITEMS_SUCCESS = '[Orders] Update Order Items Success',
  UPDATE_ORDER_ITEMS_ERROR = '[Orders] Update Order Items Error',
  ADD_ORDER_ITEM = '[ORders] Add Order Item',
  ADD_ORDER_ITEM_SUCCESS = '[ORders] Add Order Item Success',
  ADD_ORDER_ITEM_ERROR = '[ORders] Add Order Item Error',
}

export const loadOrdersForAdmin = createAction(
  OrderActions.LOAD_ORDERS_FOR_ADMIN
);

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

export const cancelOrder = createAction(
  OrderActions.CANCEL_ORDER,
  props<{ id: number }>()
);

export const cancelOrderSuccess = createAction(
  OrderActions.CANCEL_ORDER_SUCCESS,
  props<{ id: number }>()
);

export const cancelOrderError = createAction(
  OrderActions.CANCEL_ORDER_ERROR,
  props<{ errors: any }>()
);

export const approveOrder = createAction(
  OrderActions.APPROVE_ORDER,
  props<{ id: number }>()
);

export const approveOrderSuccess = createAction(
  OrderActions.APPROVE_ORDER_SUCCESS,
  props<{ id: number }>()
);

export const approveOrderError = createAction(
  OrderActions.APPROVE_ORDER_ERROR,
  props<{ errors: any }>()
);

export const saveOrder = createAction(OrderActions.SAVE_ORDER);

export const saveOrderSuccess = createAction(
  OrderActions.SAVE_ORDER_SUCCESS,
  props<{ order: Order }>()
);

export const saveOrderError = createAction(
  OrderActions.SAVE_ORDER_ERROR,
  props<{ errors: any }>()
);

export const purchaseOrder = createAction(OrderActions.PURCHASE_ORDER);

export const purchaseOrderSuccess = createAction(
  OrderActions.PURCHASE_ORDER_SUCCESS,
  props<{ order: Order }>()
);

export const purchaseOrderError = createAction(
  OrderActions.PURCHASE_ORDER_ERROR,
  props<{ errors: any }>()
);

export const updateOrderItems = createAction(
  OrderActions.UPDATE_ORDER_ITEMS,
  props<{ quantity: number; index: number }>()
);

export const updateOrderItemsSuccess = createAction(
  OrderActions.UPDATE_ORDER_ITEMS_SUCCESS,
  props<{ order: Order }>()
);

export const updateOrderItemsError = createAction(
  OrderActions.UPDATE_ORDER_ITEMS_ERROR,
  props<{ errors: any }>()
);

export const addOrderItems = createAction(
  OrderActions.ADD_ORDER_ITEM,
  props<{ orderItem: OrderItemFront }>()
);

export const addOrderItemsSuccess = createAction(
  OrderActions.ADD_ORDER_ITEM_SUCCESS,
  props<{ order: Order }>()
);

export const addOrderItemsError = createAction(
  OrderActions.ADD_ORDER_ITEM_ERROR,
  props<{ errors: any }>()
);
