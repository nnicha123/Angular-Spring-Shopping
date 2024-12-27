import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../utilities';
import { Customer } from '../models/customer';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$ = new BehaviorSubject<boolean>(false);
  customer$ = new BehaviorSubject<Customer | null>(null);

  url: string = URL + '/auth';
  constructor(private httpClient: HttpClient) {}

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
    return this.httpClient.post<Customer>(this.url, login);
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
