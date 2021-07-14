import { User } from 'src/app/shared/model/user';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  content: string;
  updatedBy: User;
  updatedDate: Date;
  status: number;
  statusDescription: string;
}
