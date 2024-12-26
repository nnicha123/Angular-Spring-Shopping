import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/order';

@Pipe({
  name: 'status',
})
export class OrderStatusPipe implements PipeTransform {
  transform(orderStatus: Status) {
    return orderStatus === 'PENDING'
      ? 'saved'
      : orderStatus === 'PROCESSING'
      ? 'success'
      : orderStatus === 'CANCELLED'
      ? 'cancelled'
      : 'failed';
  }
}
