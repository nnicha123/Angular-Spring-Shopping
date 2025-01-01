import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { URL } from '../utilities';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url: string = URL + '/customers';
  constructor(private httpClient: HttpClient) {}

  getCustomerById(id: number): Observable<Customer> {
    const url = this.url + `/${id}`;
    return this.httpClient.get<Customer>(url);
  }
}
