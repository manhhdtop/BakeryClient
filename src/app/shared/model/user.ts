import { Role } from './role';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  image: string;
  status: number;
  roles: Role[];
  createdDate: Date;
  updatedDate: Date;
}
