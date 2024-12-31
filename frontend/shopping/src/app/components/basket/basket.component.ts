import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { Order } from '../../models/order';
import { Customer } from '../../models/customer';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent {
  justPurchased: boolean = false;

  destroy$: Subject<void> = new Subject<void>();
  currentOrder$: Observable<Order | undefined> = of(undefined);

  customer: Customer | undefined;

  constructor(private router: Router, private moduleFacade: ModuleFacade) {}

  ngOnInit(): void {
    this.currentOrder$ = this.moduleFacade.currentOrder$;
  }

  // quantityUpdate(quantity: number, index: number) {
  //   this.orderService.updateOrderItemQuantity(quantity, index);
  // }

  saveOrder() {
    this.moduleFacade.saveOrder();
  }

  purchaseOrder() {
    this.moduleFacade.purchaseOrder();
  }

  // purchaseOrder() {
  //   this.orderService
  //     .purchaseOrder()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(() => {
  //       this.purchaseResponse();
  //     });
  // }

  purchaseResponse() {
    this.justPurchased = true;
    setTimeout(() => {
      this.justPurchased = false;
      if (this.customer) {
        // this.orderService.purchased();
        this.router.navigateByUrl('/orders-history');
      }
    }, 2000);
  }

  showOrderStatusMessage() {
    this.justPurchased = true;
    setTimeout(() => {
      this.justPurchased = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
