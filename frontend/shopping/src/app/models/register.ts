import { Customer } from './customer';

export interface Register extends Customer {
  username: string;
  password: string;
}
