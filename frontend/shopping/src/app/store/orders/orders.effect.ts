import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './orders.action';
import { map, switchMap } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Injectable()
export class OrdersEffect {
  constructor(private actions$: Actions, private orderService: OrderService) {}

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
}
