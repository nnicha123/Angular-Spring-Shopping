import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/order';

@Pipe({
  name: 'statusIcon',
})
export class StatusIconPipe implements PipeTransform {
  transform(status: Status): string {
    switch (status) {
      case 'PROCESSING': {
        return 'fa-regular fa-clock';
      }
      case 'COMPLETED': {
        return 'fa-solid fa-check';
      }
      case 'CANCELLED': {
        return 'fa-solid fa-ban';
      }
      case 'FAILED': {
        return 'fa-solid fa-xmark';
      }
      default:
        return '';
    }
  }
}
