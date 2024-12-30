import { Customer } from '../../models/customer';
import { Order } from '../../models/order';

export interface ModuleData {
  id: number;
  customer: Customer;
  orders: Order[];
}

export type ModuleStatus = 'loading' | 'ready' | 'error';
