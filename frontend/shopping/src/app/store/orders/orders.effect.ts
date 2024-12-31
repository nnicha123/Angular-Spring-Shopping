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
import { OrderItemFront } from '../../models/orderItem';

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

  updateOrderItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateOrderItems),
      withLatestFrom(this.store.pipe(select(fromSelectors.selectCurrentOrder))),
      switchMap(([{ quantity, index }, currentOrder]) => {
        if (currentOrder) {
          let orderItems = [...currentOrder.orderItems];
          if (quantity === 0) {
            orderItems.splice(index, 1);
          } else {
            orderItems[index] = {
              ...orderItems[index],
              quantity,
            };
          }
          currentOrder = {
            ...currentOrder,
            orderItems,
            ...updateTotal(orderItems),
          };
        }
        return [fromActions.updateOrderItemsSuccess({ order: currentOrder })];
      })
    )
  );

  addOrderItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addOrderItems),
      withLatestFrom(this.store.pipe(select(fromSelectors.selectCurrentOrder))),
      switchMap(([{ orderItem }, currentOrder]) => {
        if (currentOrder) {
          let updatedOrderItems = [...currentOrder.orderItems];
          const existingProductIndex = currentOrder.orderItems.findIndex(
            (item) => item.productId === orderItem.productId
          );
          if (existingProductIndex === -1) {
            updatedOrderItems = [...updatedOrderItems, orderItem];
          } else {
            updatedOrderItems[existingProductIndex] = {
              ...updatedOrderItems[existingProductIndex],
              quantity:
                updatedOrderItems[existingProductIndex].quantity +
                orderItem.quantity,
            };
          }
          currentOrder = {
            ...currentOrder,
            orderItems: [...updatedOrderItems],
            ...updateTotal(updatedOrderItems),
          };
        } else {
          currentOrder = initializeOrder();
          currentOrder.orderItems.push(orderItem);
        }

        return [fromActions.addOrderItemsSuccess({ order: currentOrder })];
      })
    )
  );
}

function updateTotal(orderItems: OrderItemFront[]) {
  const totalPrice = orderItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const totalQuantity = orderItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return { totalPrice, totalQuantity };
}

function initializeOrder(): Order {
  const newOrder: Order = {
    status: 'PENDING',
    totalPrice: 0,
    totalQuantity: 0,
    customerId: +(localStorage.getItem('customerId') || 0),
    orderItems: [],
  };
  return newOrder;
}
