export interface Review {
  id: number;
  comment: string;
  rating: number;
  productId: number;
  customerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
