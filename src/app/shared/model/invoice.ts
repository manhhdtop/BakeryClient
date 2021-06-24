import { Catalog } from 'src/app/shared/model/catalog';
import { Item } from 'src/app/shared/model/item';
import { Voucher } from 'src/app/shared/model/voucher';

export interface Invoice {
  id: number;
  invoiceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  province: Catalog;
  district: Catalog;
  address: string;
  voucher: Voucher;
  totalAmount: number;
  products: Item[];
  createdDate: Date;
  status: number;
}
