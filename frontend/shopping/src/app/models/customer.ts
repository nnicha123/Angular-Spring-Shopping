export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
  address: string;
  imageUrl: string;
}

export type Role = 'CUSTOMER' | 'ADMIN';
