import { User } from './user';

export interface Category {
  id: number;
  name: string;
  description: string;
  parent: Category;
  createdDate: Date;
  createdBy: User;
  updatedDate: Date;
  updatedBy: User;
  status: number;
  statusName: string;
}
