import { Option } from './option';

export interface OptionType {
  id: number;
  name: string;
  description: string;
  changePrice: boolean;
  status: number;
  options: Option[];
}
