import { OrderItem, OrderItemFront } from './orderItem';

export interface Order {
  id?: number;
  status: Status;
  totalPrice: number;
  totalQuantity: number;
  customerId: number;
  orderItems: OrderItemFront[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type Status = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
