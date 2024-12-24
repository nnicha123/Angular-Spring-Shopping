export interface ReviewCustomerDetails {
  id: number;
  name: string;
  imageUrl: string;
  comment: string;
  rating: number;
  productId: number;
  customerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
