import { on, ReducerTypes } from '@ngrx/store';
import {
  moduleEntityAdapter,
  ModuleEntityState,
} from '../definitions/store.definitions';
import * as fromActions from './orders.action';
import { getData, getProducts } from '../utils';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { act } from '@ngrx/effects';

export function ordersReducer(): ReducerTypes<ModuleEntityState, any>[] {
  return [
    on(
      fromActions.loadOrdersForAdmin,
      fromActions.loadOrdersForCustomer,
      (state, action) => {
        return {
          ...moduleEntityAdapter.updateOne(
            {
              id: state.selectedId || 0,
              changes: {
                status: 'loading',
              },
            },
            state
          ),
        };
      }
    ),
    on(fromActions.loadOrdersSuccess, (state, action) => {
      const data = getData(state);
      const products = getProducts(state);
      let orders: Order[] = mapOrders(action.orders, products);

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                orders: [...orders],
              },
              status: 'ready',
            },
          },
          state
        ),
      };
    }),
    on(
      fromActions.cancelOrder,
      fromActions.approveOrder,
      fromActions.updateOrderItems,
      fromActions.addOrderItems,
      (state, action) => {
        return {
          ...moduleEntityAdapter.updateOne(
            {
              id: state.selectedId || 0,
              changes: {
                status: 'loading',
              },
            },
            state
          ),
        };
      }
    ),
    on(fromActions.cancelOrderSuccess, (state, action) => {
      const data = getData(state);
      const cancelledId = action.id;

      let updatedOrders = data.orders.map((orders) => {
        if (orders.id === cancelledId) {
          orders.status = 'CANCELLED';
        }
        return orders;
      });

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                orders: [...updatedOrders],
              },
              status: 'ready',
            },
          },
          state
        ),
      };
    }),
    on(fromActions.approveOrderSuccess, (state, action) => {
      const data = getData(state);
      const approvedId = action.id;

      let updatedOrders = data.orders.map((orders) => {
        if (orders.id === approvedId) {
          orders.status = 'COMPLETED';
        }
        return orders;
      });

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                orders: [...updatedOrders],
              },
              status: 'ready',
            },
          },
          state
        ),
      };
    }),
    on(fromActions.saveOrder, fromActions.purchaseOrder, (state, action) => {
      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              status: 'loading',
            },
          },
          state
        ),
      };
    }),
    on(fromActions.saveOrderSuccess, (state, action) => {
      const data = getData(state);
      let updatedOrders = data.orders.map((order) => {
        if (order.status === 'PENDING') {
          return action.order;
        } else {
          return order;
        }
      });

      const products = getProducts(state);
      updatedOrders = mapOrders(updatedOrders, products);

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                orders: [...updatedOrders],
              },
              status: 'ready',
            },
          },
          state
        ),
      };
    }),
    on(fromActions.purchaseOrderSuccess, (state, action) => {
      const data = getData(state);
      const products = getProducts(state);

      let updatedOrders = data.orders.map((order) => {
        if (order.status === 'PENDING') {
          return action.order;
        } else {
          return order;
        }
      });

      updatedOrders = mapOrders(updatedOrders, products);

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                orders: [...updatedOrders],
              },
              status: 'ready',
            },
          },
          state
        ),
      };
    }),
    on(fromActions.updateOrderItemsSuccess, (state, action) => {
      const data = getData(state);
      const products = getProducts(state);

      let updatedOrders = data.orders.map((order) => {
        if (order.status === 'PENDING') {
          return action.order;
        } else {
          return order;
        }
      });

      updatedOrders = mapOrders(updatedOrders, products);

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                orders: [...updatedOrders],
              },
              status: 'loading',
            },
          },
          state
        ),
      };
    }),
    on(fromActions.addOrderItemsSuccess, (state, action) => {
      const data = getData(state);
      const products = getProducts(state);
      let pendingOrderPresent = false;
      let updatedOrders = data.orders.map((order) => {
        if (order.status === 'PENDING') {
          pendingOrderPresent = true;
          return action.order;
        } else {
          return order;
        }
      });
      if (pendingOrderPresent) {
        updatedOrders = mapOrders(updatedOrders, products);
      } else {
        updatedOrders = mapOrders([...updatedOrders, action.order], products);
      }

      return {
        ...moduleEntityAdapter.updateOne(
          {
            id: state.selectedId || 0,
            changes: {
              data: {
                ...data,
                orders: [...updatedOrders],
              },
              status: 'loading',
            },
          },
          state
        ),
      };
    }),
  ];
}

function mapOrders(orders: Order[], products: Product[]) {
  orders = orders.map((orders) => {
    return {
      ...orders,
      orderItems: orders.orderItems.map((item) => {
        return {
          ...item,
          ...getProductById(item.productId, products),
        };
      }),
    };
  });
  return orders;
}

function getProductById(
  productId: number,
  products: Product[]
): {
  name: string;
  imageUrl: string;
  price: number;
} {
  const { name, imageUrl, price } = products.find(
    (product) => product.id === productId
  )!;
  return { name, imageUrl, price };
}
