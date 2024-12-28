export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
  address: string;
  imageUrl: string;
}

type Role = 'CUSTOMER' | 'ADMIN';
