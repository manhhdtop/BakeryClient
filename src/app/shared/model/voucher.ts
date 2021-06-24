export interface Voucher {
  id: number;
  code: string;
  name: string;
  description: string;
  value: number;
  minAmount: number;
  maxAmount: number;
  minRefund: number;
  maxRefund: number;
  type: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  status: number;
}
