import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Order } from '../models/order';
import { URL } from '../utilities';
import { OrderItem, OrderItemFront } from '../models/orderItem';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders$ = new BehaviorSubject<Order[]>([]);

  currentOrder$ = new BehaviorSubject<Order | undefined>(undefined);
  pastOrders$ = new BehaviorSubject<Order[]>([]);

  processingOrders$ = new BehaviorSubject<Order[]>([]);
  completedOrders$ = new BehaviorSubject<Order[]>([]);
  cancelledOrders$ = new BehaviorSubject<Order[]>([]);

  adminOrders$ = new BehaviorSubject<Order[]>([]);
  adminProcessingOrders$ = new BehaviorSubject<Order[]>([]);
  adminFinishedOrders$ = new BehaviorSubject<Order[]>([]);

  apiCalled$ = new BehaviorSubject<boolean>(false);

  url: string = URL + '/orders';

  constructor(
    private httpClient: HttpClient,
    private productService: ProductsService
  ) {}

  markApiCalledFalse(): void {
    this.apiCalled$.next(false);
  }

  markApiAsCalled(): void {
    this.apiCalled$.next(true);
  }

  hasApiBeenCalled(): boolean {
    return this.apiCalled$.getValue();
  }

  mapOrderItemsFront(orderItems: OrderItem[]): OrderItemFront[] {
    return orderItems
      ? orderItems.map((item) => {
          return {
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            ...this.getProductById(item.productId),
          };
        })
      : [];
  }

  setOrdersForAdmin(orders: Order[]): void {
    const ordersToSet = orders.map((order) => {
      return {
        ...order,
        orderItems: this.mapOrderItemsFront(order.orderItems),
      };
    });

    const processingOrders = ordersToSet.filter(
      (order) => order.status === 'PROCESSING'
    );
    const finishedOrders = ordersToSet.filter(
      (order) => order.status != 'PROCESSING' && order.status != 'PENDING'
    );

    this.adminOrders$.next(orders);

    this.setAdminProcessingOrders(processingOrders);
    this.setAdminFinishedOrders(finishedOrders);
  }

  setOrders(orders: Order[]): void {
    const ordersToSet = orders.map((order) => {
      return {
        ...order,
        orderItems: this.mapOrderItemsFront(order.orderItems),
      };
    });

    this.orders$.next(ordersToSet);

    // Setup current order -> Find status of 'PENDING'

    const allOrders: Order[] = this.orders$.getValue();

    const currentOrder: Order | undefined = allOrders.find(
      (order) => order.status == 'PENDING'
    );
    const completedOrders: Order[] = allOrders.filter(
      (order) => order.status == 'COMPLETED'
    );
    const processingOrders: Order[] = allOrders.filter(
      (order) => order.status == 'PROCESSING'
    );
    const cancelledOrders: Order[] = allOrders.filter(
      (order) => order.status == 'CANCELLED'
    );

    const pastOrders: Order[] = allOrders.filter(
      (order) => order.status !== 'PENDING'
    );

    this.setCurrentOrder(currentOrder);
    this.setPastOrders(pastOrders);
    this.setProcessingOrders(processingOrders);
    this.setCancelledOrders(cancelledOrders);
    this.setCompletedOrders(completedOrders);
  }

  getOrderById(id: number, isAdmin: boolean = false): Order {
    let ordersToGet$ = this.orders$;
    if (isAdmin) {
      ordersToGet$ = this.adminOrders$;
    }
    const order: Order = ordersToGet$
      .getValue()
      .find((order) => order.id === id)!;
    return order;
  }

  getProductById(productId: number): {
    name: string;
    imageUrl: string;
    price: number;
  } {
    const { name, imageUrl, price } =
      this.productService.getProductById(productId);
    return { name, imageUrl, price };
  }

  setAdminProcessingOrders(orders: Order[]): void {
    this.adminProcessingOrders$.next(orders);
  }

  setAdminFinishedOrders(orders: Order[]): void {
    this.adminFinishedOrders$.next(orders);
  }

  setCurrentOrder(order: Order | undefined): void {
    this.currentOrder$.next(order);
  }

  setPastOrders(orders: Order[]): void {
    this.pastOrders$.next(orders);
  }

  setProcessingOrders(orders: Order[]): void {
    this.processingOrders$.next(orders);
  }

  setCancelledOrders(orders: Order[]): void {
    this.cancelledOrders$.next(orders);
  }

  setCompletedOrders(orders: Order[]): void {
    this.completedOrders$.next(orders);
  }

  addOrderItem(orderItem: OrderItemFront): void {
    let order = this.currentOrder$.getValue();
    if (order) {
      const currentItems = order.orderItems;
      let updatedOrderItems = [...currentItems];
      const existingProductIndex = currentItems.findIndex(
        (item) => item.productId === orderItem.productId
      );
      if (existingProductIndex === -1) {
        updatedOrderItems = [...updatedOrderItems, orderItem];
      } else {
        updatedOrderItems[existingProductIndex].quantity += orderItem.quantity;
      }
      order.orderItems = [...updatedOrderItems];
    } else {
      order = this.initializeOrder();
      order.orderItems.push(orderItem);
    }
    this.updateOrderFromOrderItems(order);
  }

  initializeOrder(): Order {
    const newOrder: Order = {
      status: 'PENDING',
      totalPrice: 0,
      totalQuantity: 0,
      customerId: +(localStorage.getItem('customerId') || 0),
      orderItems: [],
    };
    return newOrder;
  }

  updateOrderItemQuantity(quantity: number, index: number) {
    const order = this.currentOrder$.getValue();
    if (order) {
      const orderItems = [...order.orderItems];
      if (quantity === 0) {
        orderItems.splice(index, 1);
      } else {
        orderItems[index].quantity = quantity;
      }
      order.orderItems = orderItems;
      this.updateOrderFromOrderItems(order);
    }
  }

  removeOrderItem(itemId: number): void {
    const order = this.currentOrder$.getValue();
    if (order) {
      const orderItems = [...order.orderItems].splice(itemId, 1);
      order.orderItems = orderItems;
      this.updateOrderFromOrderItems(order);
    }
  }

  updateOrderFromOrderItems(order: Order) {
    const { totalPrice, totalQuantity } = this.updateTotal(order.orderItems);

    const updatedOrder: Order = {
      ...order,
      totalPrice,
      totalQuantity,
    };
    console.log({ updatedOrder });
    console.log(this.orders$.getValue());
    this.currentOrder$.next(updatedOrder);
  }

  updateTotal(orderItems: OrderItemFront[]) {
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

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url);
  }

  getOrdersForComponents(destroySubject$: Subject<void>) {
    if (!this.hasApiBeenCalled()) {
      const customerId = localStorage.getItem('customerId');
      if (customerId) {
        this.getOrdersByCustomerId(+customerId)
          .pipe(takeUntil(destroySubject$))
          .subscribe((orders) => {
            this.markApiAsCalled();
            this.setOrders(orders);
          });
      }
    }
  }

  getOrdersAdminForComponents(destroySubject$: Subject<void>) {
    if (!this.hasApiBeenCalled()) {
      this.getAllOrders()
        .pipe(takeUntil(destroySubject$))
        .subscribe((orders) => {
          this.markApiAsCalled();
          this.setOrdersForAdmin(orders);
        });
    }
  }

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url);
  }

  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    const url = this.url + `/customer/${customerId}`;
    this.markApiAsCalled();
    return this.httpClient.get<Order[]>(url);
  }

  updateOrderById(id: number, updatedOrder: Order): Observable<void> {
    const url = this.url + `/${id}`;
    return this.httpClient.put<void>(url, updatedOrder);
  }

  saveOrder(): Observable<Order | null> {
    const order: Order | undefined = this.currentOrder$.getValue();
    if (order) {
      return this.httpClient.post<Order>(this.url, order).pipe(
        tap((order: Order) => {
          const returnedOrder = {
            ...order,
            orderItems: this.mapOrderItemsFront(order.orderItems),
          };
          this.setCurrentOrder(returnedOrder);
        })
      );
    }
    return of(null);
  }

  purchaseOrder(): Observable<Order | null> {
    let order: Order | undefined = this.currentOrder$.getValue();
    if (order) {
      order.status = 'PROCESSING';
      return this.httpClient.post<Order>(this.url, order).pipe(
        tap(() => {
          this.markApiCalledFalse();
        })
      );
    }
    return of();
  }

  cancelOrder(id: number, isAdmin: boolean): Observable<Order | null> {
    let order: Order | undefined = this.getOrderById(id, isAdmin);
    if (order) {
      order.status = 'CANCELLED';
      return this.httpClient.post<Order>(this.url, order).pipe(
        tap(() => {
          this.markApiCalledFalse();
        })
      );
    }
    return of();
  }
  approveOrder(id: number): Observable<Order | null> {
    let order: Order | undefined = this.getOrderById(id, true);
    if (order) {
      order.status = 'COMPLETED';
      return this.httpClient.post<Order>(this.url, order).pipe(
        tap(() => {
          this.markApiCalledFalse();
        })
      );
    }
    return of();
  }
}
