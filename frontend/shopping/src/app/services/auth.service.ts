import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../utilities';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = URL + '/auth';
  constructor(private httpClient: HttpClient) {}

  getCustomerId(): number {
    return +(localStorage.getItem('customerId') || 0);
  }

  login(login: Login): Observable<Customer> {
    const url = this.url + '/login';
    return this.httpClient.post<Customer>(url, login);
  }

  register(register: Register): Observable<Customer> {
    const url = this.url + '/register';
    return this.httpClient.post<Register>(url, register);
  }
}
