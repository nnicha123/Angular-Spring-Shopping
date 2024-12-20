export interface Order {
  id: number;
  status: Status;
  totalPrice: number;
  totalQuantity: number;
  customerId: number;
  createdAt: Date;
  updatedAt: Date;
}

type Status = 'PENDING' | 'FAILED' | 'COMPLETED';
