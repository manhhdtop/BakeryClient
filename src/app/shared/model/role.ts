import { Action } from './action';

export interface Role {
  id: number;
  code: string;
  name: string;
  description: string;
  status: number;
  actions: Action[];
}
