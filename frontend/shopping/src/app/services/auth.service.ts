import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { URL } from '../utilities';
import { Customer } from '../models/customer';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { OrderService } from './order.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  loggedIn$ = new BehaviorSubject<boolean>(false);
  customer$ = new BehaviorSubject<Customer | null>(null);

  url: string = URL + '/auth';
  constructor(
    private httpClient: HttpClient,
    private orderService: OrderService,
    private router: Router
  ) {}

  setCustomer(customer: Customer | null) {
    this.customer$.next(customer);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn$.next(value);
  }

  userLoggedIn(): boolean {
    return localStorage.getItem('customerId') ? true : false;
  }

  getCustomerId(): number {
    return +(localStorage.getItem('customerId') || 0);
  }

  login(login: Login): Observable<Customer> {
    const url = this.url + '/login';
    return this.httpClient
      .post<Customer>(url, login)
      .pipe(tap((customer) => this.setupBrowser(customer)));
  }

  register(register: Register): Observable<Customer> {
    const url = this.url + '/register';
    return this.httpClient
      .post<Register>(url, register)
      .pipe(tap((customer) => this.setupBrowser(customer)));
  }

  setupBrowser(customer: Customer) {
    localStorage.setItem('customerId', '' + customer.id);
    this.setLoggedIn(true);
    this.setCustomer(customer);
    if (customer.role === 'CUSTOMER') {
      this.orderService
        .getOrdersByCustomerId(customer.id || 0)
        .pipe(
          takeUntil(this.destroy$),
          tap((orders) => {
            this.orderService.markApiAsCalled();
            this.orderService.setOrders(orders);
          })
        )
        .subscribe();
    }

    // Then navigate
    this.router.navigateByUrl('/product');
  }

  logout() {
    localStorage.removeItem('customerId');
    this.setLoggedIn(false);
    this.setCustomer(null);
  }

  getCustomer(): Customer | null {
    return this.customer$.getValue();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
