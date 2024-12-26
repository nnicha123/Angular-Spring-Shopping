import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/order';

@Pipe({
  name: 'statusText',
})
export class OrderStatusText implements PipeTransform {
  transform(orderStatus: Status) {
    return orderStatus === 'PENDING'
      ? 'Order Saved Successfully'
      : orderStatus === 'PROCESSING'
      ? 'Order Submitted Successfully. Redirecting ...'
      : orderStatus === 'CANCELLED'
      ? 'Order Cancelled'
      : 'Order failed. Please contact us or try again.';
  }
}
