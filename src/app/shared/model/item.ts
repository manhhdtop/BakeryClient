import { Product } from './product';

export interface Item {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  options: Map<number, number>;
}
