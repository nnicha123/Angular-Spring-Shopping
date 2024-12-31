import { on, ReducerTypes } from '@ngrx/store';
import {
  moduleEntityAdapter,
  ModuleEntityState,
} from '../definitions/store.definitions';
import * as fromActions from './auth.action';
import { getData, initialModuleData } from '../utils';

export function authReducer(): ReducerTypes<ModuleEntityState, any>[] {
  return [
    on(fromActions.logoutUser, (state, action) => {
      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: { ...initialModuleData },
            },
          },
          state
        ),
      };
    }),
    on(fromActions.loginUser, fromActions.loadUser, (state, action) => {
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
    on(fromActions.loginUserSuccess, (state, action) => {
      const data = getData(state);
      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                id: action.customer.id || 0,
                customer: {
                  ...action.customer,
                },
              },
              isLoggedIn: true,
              status: 'ready',
            },
          },
          state
        ),
        selectedId: action.customer.id || 0,
      };
    }),
    on(fromActions.loginUserError, (state, action) => {
      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              status: 'error',
            },
          },
          state
        ),
      };
    }),
  ];
}
