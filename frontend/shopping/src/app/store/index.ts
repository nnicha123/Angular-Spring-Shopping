import {
  loginUser,
  loginUserError,
  loginUserSuccess,
} from './auth/auth.action';
import { AuthEffect } from './auth/auth.effect';
import { moduleReducer } from './module.reducer';

const actions = {
  loginUser: loginUser,
  loginUserSuccess: loginUserSuccess,
  loginUserError: loginUserError,
};

const effects: any[] = [AuthEffect];

export { actions, effects, moduleReducer };
