import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as fromActions from './auth.action';
import { map, switchMap } from 'rxjs/operators';
import { Customer } from '../../models/customer';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

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

  loginUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.loginUserSuccess),
        switchMap((action) => {
          localStorage.setItem('customerId', '' + action.customer.id);
          this.router.navigate(['/products']);
          return [];
        })
      ),
    { dispatch: false }
  );
}
