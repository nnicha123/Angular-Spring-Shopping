import { createAction, props } from '@ngrx/store';
import { Login } from '../../models/login';
import { Customer } from '../../models/customer';

enum AuthActions {
  LOAD_USER = '[User] Load User',
  LOGIN_USER = '[User] Login User',
  LOGOUT_USER = '[User] Logout User',
  LOGIN_USER_SUCCESS = '[User] Login User Success',
  LOGIN_USER_ERROR = '[User] Login User Error',
}

export const loadUser = createAction(
  AuthActions.LOAD_USER,
  props<{ customerId: number }>()
);

export const loginUser = createAction(
  AuthActions.LOGIN_USER,
  props<{ login: Login }>()
);

export const loginUserSuccess = createAction(
  AuthActions.LOGIN_USER_SUCCESS,
  props<{ customer: Customer }>()
);

export const loginUserError = createAction(
  AuthActions.LOGIN_USER_ERROR,
  props<{ error: any }>()
);

export const logoutUser = createAction(AuthActions.LOGOUT_USER);
