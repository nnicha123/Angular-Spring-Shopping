import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../utilities';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = URL + '/auth';
  constructor(private httpClient: HttpClient) {}

  login(login: Login): Observable<Customer> {
    return this.httpClient.post<Customer>(this.url, login);
  }
}
