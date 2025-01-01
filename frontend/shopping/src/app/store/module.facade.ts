import { select, Store } from '@ngrx/store';
import { ModuleEntityState } from './definitions/store.definitions';
import { Login } from '../models/login';
import * as fromAuthActions from './auth/auth.action';
import * as fromProductsActions from './products/products.action';
import * as fromOrderActions from './orders/orders.action';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Customer, Role } from '../models/customer';
import * as fromSelectors from './module.selector';
import { Order, Status } from '../models/order';
import { OrderItemFront } from '../models/orderItem';

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

  logout(): void {
    this.store.dispatch(fromAuthActions.logoutUser());
  }

  cancelOrder(id: number): void {
    this.store.dispatch(fromOrderActions.cancelOrder({ id }));
  }

  approveOrder(id: number): void {
    this.store.dispatch(fromOrderActions.approveOrder({ id }));
  }

  saveOrder(): void {
    this.store.dispatch(fromOrderActions.saveOrder());
  }

  purchaseOrder(): void {
    this.store.dispatch(fromOrderActions.purchaseOrder());
  }

  updateOrderItems(quantity: number, index: number): void {
    this.store.dispatch(fromOrderActions.updateOrderItems({ quantity, index }));
  }

  addOrderItem(orderItem: OrderItemFront) {
    this.store.dispatch(fromOrderActions.addOrderItems({ orderItem }));
  }

  selectOrdersWithStatus(status: Status): Observable<Order[]> {
    return this.store.pipe(
      select(fromSelectors.selectOrdersWithStatus(status))
    );
  }

  selectProductWithId(id: number): Observable<Product | undefined> {
    return this.store.pipe(select(fromSelectors.selectProductsWithId(id)));
  }

  get user$(): Observable<Customer> {
    return this.store.pipe(select(fromSelectors.selectUser));
  }

  get userRole$(): Observable<Role> {
    return this.store.pipe(select(fromSelectors.selectRole));
  }

  get products$(): Observable<Product[]> {
    return this.store.pipe(select(fromSelectors.selectProducts));
  }

  get pastOrdersCustomer$(): Observable<Order[]> {
    return this.store.pipe(select(fromSelectors.selectPastOrdersForCustomer));
  }

  get pastOrdersAdmin$(): Observable<Order[]> {
    return this.store.pipe(select(fromSelectors.selectPastOrdersForAdmin));
  }

  get currentOrder$(): Observable<Order | undefined> {
    return this.store.pipe(select(fromSelectors.selectCurrentOrder));
  }
}