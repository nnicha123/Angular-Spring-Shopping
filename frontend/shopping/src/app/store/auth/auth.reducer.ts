import { on, ReducerTypes } from '@ngrx/store';
import {
  moduleEntityAdapter,
  ModuleEntityState,
} from '../definitions/store.definitions';
import * as fromActions from './auth.action';
import { getData } from '../utils';

export function authReducer(): ReducerTypes<ModuleEntityState, any>[] {
  return [
    on(fromActions.loginUser, (state, action) => {
      return {
        ...moduleEntityAdapter.addOne(
          {
            data: {
              id: 0,
              customer: {
                firstName: '',
                lastName: '',
                role: 'CUSTOMER',
                address: '',
                imageUrl: '',
              },
              orders: [],
            },
            isLoggedIn: false,
            status: 'loading',
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
