import { createSelector } from '@ngrx/store';
import { ModuleEntityState } from './definitions/store.definitions';
import * as fromReducer from './module.reducer';
import { ModuleData } from './definitions/module.definition';
import { Customer } from '../models/customer';
import { Order, Status } from '../models/order';

export const selectModuleState = (state: { module: ModuleEntityState }) =>
  state.module;

export const selectAllEntities = createSelector(
  selectModuleState,
  fromReducer.selectAllEntities
);

export const selectSelectedId = createSelector(
  selectModuleState,
  (state: ModuleEntityState) => state.selectedId
);

export const selectEntity = createSelector(
  selectModuleState,
  (state: ModuleEntityState) => state.entities[state.selectedId || 0]
);

export const selectProducts = createSelector(selectEntity, (entity) =>
  entity ? entity.products : []
);

export const selectProductsWithId = (id: number) =>
  createSelector(selectProducts, (products) =>
    products.find((product) => product.id === id)
  );

export const selectReviewsForProductId = (productId: number) =>
  createSelector(selectProductsWithId(productId), (product) => {
    return product ? product.review : undefined;
  });

export const selectData = createSelector(selectEntity, (entity) =>
  entity ? entity.data : ({} as ModuleData)
);

export const selectOrders = createSelector(selectData, (data) =>
  data ? data.orders : []
);

export const selectPastOrdersForAdmin = createSelector(selectOrders, (orders) =>
  orders
    ? orders.filter(
        (order) => order.status !== 'PENDING' && order.status !== 'PROCESSING'
      )
    : []
);

export const selectPastOrdersForCustomer = createSelector(
  selectOrders,
  (orders) =>
    orders ? orders.filter((order) => order.status !== 'PENDING') : []
);

export const selectOrdersWithStatus = (status: Status) =>
  createSelector(selectOrders, (orders) => {
    return orders ? orders.filter((order) => order.status === status) : [];
  });

export const selectCurrentOrder = createSelector(selectOrders, (orders) => {
  const pendingOrder = orders
    ? orders.find((order) => order.status === 'PENDING')
    : undefined;
  return pendingOrder as Order;
});

export const selectProcessingOrders = createSelector(selectOrders, (orders) =>
  orders ? orders.filter((order) => order.status === 'PROCESSING') : []
);

export const selectUser = createSelector(selectData, (data) =>
  data ? data.customer : ({} as Customer)
);

export const selectRole = createSelector(selectUser, (user) =>
  user ? user.role : 'CUSTOMER'
);

export const selectStatus = createSelector(selectEntity, (entity) =>
  entity ? entity.status : 'error'
);
