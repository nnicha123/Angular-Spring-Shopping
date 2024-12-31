import { createSelector } from '@ngrx/store';
import { ModuleEntityState } from './definitions/store.definitions';
import * as fromReducer from './module.reducer';
import { ModuleData } from './definitions/module.definition';
import { Customer } from '../models/customer';

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

export const selectData = createSelector(selectEntity, (entity) =>
  entity ? entity.data : ({} as ModuleData)
);

export const selectOrders = createSelector(selectData, (data) =>
  data ? data.orders : []
);

export const selectUser = createSelector(selectData, (data) =>
  data ? data.customer : ({} as Customer)
);

export const selectRole = createSelector(selectUser, (user) => user.role);

export const selectStatus = createSelector(selectEntity, (entity) =>
  entity ? entity.status : 'error'
);
