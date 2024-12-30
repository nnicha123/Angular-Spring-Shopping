import { createAction, props } from '@ngrx/store';
import { Login } from '../../models/login';
import { Customer } from '../../models/customer';

enum AuthActions {
  LOGIN_USER = '[User] Login User',
  LOGIN_USER_SUCCESS = '[User] Login User Success',
  LOGIN_USER_ERROR = '[User] Login User Error',
}

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
