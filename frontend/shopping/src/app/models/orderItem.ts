export interface OrderItem {
  id?: number;
  productId: number;
  quantity: number;
}

export interface OrderItemFront extends OrderItem {
  name: string;
  imageUrl: string;
  price: number;
}
