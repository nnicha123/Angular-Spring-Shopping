import { on, ReducerTypes } from '@ngrx/store';
import {
  moduleEntityAdapter,
  ModuleEntityState,
} from '../definitions/store.definitions';
import * as fromActions from './orders.action';
import { getData } from '../utils';

export function ordersReducer(): ReducerTypes<ModuleEntityState, any>[] {
  return [
    on(
      fromActions.loadOrdersForAdmin,
      fromActions.loadOrdersForCustomer,
      (state, action) => {
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
      }
    ),
    on(fromActions.loadOrdersSuccess, (state, action) => {
      const data = getData(state);
      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                orders: [...action.orders],
              },
              status: 'ready',
            },
          },
          state
        ),
      };
    }),
  ];
}
