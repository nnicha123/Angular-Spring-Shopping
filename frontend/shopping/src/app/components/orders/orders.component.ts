import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, Status } from '../../models/order';
import { Subject, takeUntil } from 'rxjs';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private moduleFacade: ModuleFacade) {}

  @Input() order!: Order;
  readOnly: boolean = false;
  ngOnInit(): void {
    this.readOnly = this.order.status !== 'PENDING';
  }

  quantityUpdate(quantity: number, index: number) {
    // this.orderService.updateOrderItemQuantity(quantity, index);
    this.moduleFacade.updateOrderItems(quantity, index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
