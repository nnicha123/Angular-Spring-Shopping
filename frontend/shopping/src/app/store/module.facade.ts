import { select, Store } from '@ngrx/store';
import { ModuleEntityState } from './definitions/store.definitions';
import { Login } from '../models/login';
import * as fromAuthActions from './auth/auth.action';
import * as fromProductsActions from './products/products.action';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import * as fromSelectors from './module.selector';

@Injectable()
export class ModuleFacade {
  constructor(private store: Store<{ module: ModuleEntityState }>) {}

  addProduct(product: Product): void {
    this.store.dispatch(fromProductsActions.addProduct({ product }));
  }

  loadProducts(): void {
    this.store.dispatch(fromProductsActions.loadProducts());
  }

  loadUser(customerId: number): void {
    this.store.dispatch(fromAuthActions.loadUser({ customerId }));
  }

  loginUser(login: Login): void {
    this.store.dispatch(fromAuthActions.loginUser({ login }));
  }

  get user$(): Observable<Customer> {
    return this.store.pipe(select(fromSelectors.selectUser));
  }

  get products$(): Observable<Product[]> {
    return this.store.pipe(select(fromSelectors.selectProducts));
  }
}
