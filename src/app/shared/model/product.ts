import { Category } from './category';
import { Option } from './option';
import { UploadResponse } from './upload-response';
import { User } from './user';
import { OptionType } from 'src/app/shared/model/option-type';
import {ProductRate} from './product-rate';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: Category;
  images: UploadResponse[];
  rates: ProductRate[];
  price: number;
  createdDate: Date;
  createdBy: User;
  updatedDate: Date;
  updatedBy: User;
  status: number;
  options: Option[];
  optionTypes: OptionType[];
}
