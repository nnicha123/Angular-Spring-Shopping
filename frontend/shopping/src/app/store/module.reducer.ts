import { Action, createReducer } from '@ngrx/store';
import {
  moduleEntityAdapter,
  ModuleEntityState,
} from './definitions/store.definitions';
import { authReducer } from './auth/auth.reducer';
import { productsReducer } from './products/products.reducer';
import { ordersReducer } from './orders/orders.reducer';

export const initialState: ModuleEntityState =
  moduleEntityAdapter.getInitialState({ selectedId: null });

const { selectIds, selectEntities, selectAll } =
  moduleEntityAdapter.getSelectors();

export const selectAllEntities = selectAll;

const _reducer = createReducer(
  initialState,
  ...authReducer(),
  ...productsReducer(),
  ...ordersReducer()
);

export function moduleReducer(
  state: ModuleEntityState | undefined,
  action: Action
) {
  return _reducer(state, action);
}
