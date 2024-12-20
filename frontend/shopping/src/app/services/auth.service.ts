import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../utilities';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = URL + '/auth';
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<Customer> {
    const login = { username, password };
    return this.httpClient.post<Customer>(this.url, login);
  }
}
