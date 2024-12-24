import { OrderItem } from './orderItem';

export interface Order {
  id?: number;
  status: Status;
  totalPrice: number;
  totalQuantity: number;
  customerId: number;
  orderItems: OrderItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

type Status = 'PENDING' | 'FAILED' | 'COMPLETED';
