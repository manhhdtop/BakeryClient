import { Option } from './option';

export interface OptionType {
  id: number;
  name: string;
  description: string;
  status: number;
  options: Option[];
}
