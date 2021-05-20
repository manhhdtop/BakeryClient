import { OptionType } from './option-type';

export interface Option {
  id: number;
  productId: number;
  value: string;
  optionType: OptionType;
  moreInfo: string;
}
