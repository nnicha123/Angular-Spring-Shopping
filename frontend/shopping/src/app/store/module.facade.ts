import { Store } from '@ngrx/store';
import { ModuleEntityState } from './definitions/store.definitions';
import { Login } from '../models/login';
import * as fromAuthActions from './auth/auth.action';
import * as fromProductsActions from './products/products.action';
import { Injectable } from '@angular/core';

@Injectable()
export class ModuleFacade {
  constructor(private store: Store<{ module: ModuleEntityState }>) {}

  loadProducts(): void {
    this.store.dispatch(fromProductsActions.loadProducts());
  }

  loadUser(customerId: number): void {
    this.store.dispatch(fromAuthActions.loadUser({ customerId }));
  }

  loginUser(login: Login): void {
    this.store.dispatch(fromAuthActions.loginUser({ login }));
  }
}
