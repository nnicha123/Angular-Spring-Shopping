import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../utilities';
import { Customer } from '../models/customer';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { OrderService } from './order.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
    return this.httpClient
      .post<Customer>(this.url, login)
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
    this.orderService.markApiCalledFalse();
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
}
