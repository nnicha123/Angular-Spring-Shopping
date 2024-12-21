import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private customerService: CustomerService) {}

  title = 'shopping';
  ngOnInit(): void {
    // Test -> might not do it here but in its' own component
    // this.customerService
    //   .getCustomerById(1)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((customer) => console.log(customer));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
