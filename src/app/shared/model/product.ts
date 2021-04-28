import { Category } from './category';
import { User } from './user';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: Category;
  images: string[];
  price: number;
  createdDate: Date;
  createdBy: User;
  updatedDate: Date;
  updatedBy: User;
  status: number;
}
