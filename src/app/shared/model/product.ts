import { Category } from './category';
import { User } from './user';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  image: string;
  createdDate: Date;
  createdBy: User;
  updatedDate: Date;
  updatedBy: User;
  status: number;
}
