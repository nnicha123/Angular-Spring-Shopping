import { Review } from './review';
import { ReviewCustomerDetails } from './review-customer-details';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  numInStock: number;
  numSold: number;
  price: number;
  numRatings: number;
  reviews: ReviewCustomerDetails[];
}
