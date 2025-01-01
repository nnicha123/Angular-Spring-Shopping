import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as fromActions from './auth.action';
import * as fromOrderActions from '../orders/orders.action';
import { map, switchMap } from 'rxjs/operators';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadUser),
      switchMap((action) => {
        const customerId = action.customerId;
        return this.customerService
          .getCustomerById(customerId)
          .pipe(
            map((customer: Customer) =>
              fromActions.loginUserSuccess({ customer })
            )
          );
      })
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loginUser),
      switchMap((action) => {
        const login = action.login;
        return this.authService
          .login(login)
          .pipe(
            map((customer: Customer) =>
              fromActions.loginUserSuccess({ customer })
            )
          );
      })
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.registerUser),
      switchMap((action) => {
        const register = action.register;
        return this.authService
          .register(register)
          .pipe(
            map((customer: Customer) =>
              fromActions.loginUserSuccess({ customer })
            )
          );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.logoutUser),
        switchMap(() => {
          localStorage.removeItem('customerId');
          return [];
        })
      ),
    { dispatch: false }
  );

  loginUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loginUserSuccess),
      switchMap((action) => {
        const customer = action.customer;
        localStorage.setItem('customerId', '' + action.customer.id);
        this.router.navigate(['/products']);
        if (customer.role === 'CUSTOMER') {
          return [
            fromOrderActions.loadOrdersForCustomer({
              customerId: customer.id!,
            }),
          ];
        } else {
          return [fromOrderActions.loadOrdersForAdmin()];
        }
      })
    )
  );
}
