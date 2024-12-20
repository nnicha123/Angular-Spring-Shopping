export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
  address: string;
}

type Role = 'CUSTOMER' | 'ADMIN';
