import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './orders.action';
import { from, map, switchMap, withLatestFrom } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { select, Store } from '@ngrx/store';
import { ModuleEntityState } from '../definitions/store.definitions';
import * as fromSelectors from '../module.selector';
import { Router } from '@angular/router';

@Injectable()
export class OrdersEffect {
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private router: Router,
    private store: Store<{ module: ModuleEntityState }>
  ) {}

  loadAdminOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadOrdersForAdmin),
      switchMap(() => {
        return this.orderService
          .getAllOrders()
          .pipe(
            map((orders: Order[]) => fromActions.loadOrdersSuccess({ orders }))
          );
      })
    )
  );

  loadCustomerOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadOrdersForCustomer),
      switchMap(({ customerId }) => {
        return this.orderService
          .getOrdersByCustomerId(customerId)
          .pipe(
            map((orders: Order[]) => fromActions.loadOrdersSuccess({ orders }))
          );
      })
    )
  );

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.cancelOrder),
      withLatestFrom(this.store.pipe(select(fromSelectors.selectOrders))),
      switchMap(([{ id }, orders]) => {
        const order = orders.find((order) => order.id === id);
        if (order) {
          return this.orderService
            .updateOrder(order, 'CANCELLED')
            .pipe(map(() => fromActions.cancelOrderSuccess({ id })));
        } else {
          return [];
        }
      })
    )
  );

  approveOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.approveOrder),
      withLatestFrom(this.store.pipe(select(fromSelectors.selectOrders))),
      switchMap(([{ id }, orders]) => {
        const order = orders.find((order) => order.id === id);
        if (order) {
          return this.orderService
            .updateOrder(order, 'COMPLETED')
            .pipe(map(() => fromActions.approveOrderSuccess({ id })));
        } else {
          return [];
        }
      })
    )
  );
  toHistory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromActions.approveOrderSuccess,
          fromActions.cancelOrderSuccess,
          fromActions.purchaseOrderSuccess
        ),
        switchMap(() => {
          this.router.navigate(['/orders-history']);
          return [];
        })
      ),
    { dispatch: false }
  );

  saveOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.saveOrder),
      withLatestFrom(this.store.pipe(select(fromSelectors.selectCurrentOrder))),
      switchMap(([action, currentOrder]) => {
        if (currentOrder) {
          return this.orderService
            .saveOrder(currentOrder)
            .pipe(
              map((order: Order) => fromActions.saveOrderSuccess({ order }))
            );
        } else {
          return [];
        }
      })
    )
  );

  purchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.purchaseOrder),
      withLatestFrom(this.store.pipe(select(fromSelectors.selectCurrentOrder))),
      switchMap(([action, currentOrder]) => {
        if (currentOrder) {
          return this.orderService
            .purchaseOrder(currentOrder)
            .pipe(
              map((order: Order) => fromActions.purchaseOrderSuccess({ order }))
            );
        } else {
          return [];
        }
      })
    )
  );
}
