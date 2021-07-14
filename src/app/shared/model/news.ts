export interface News {
  id: number;
  slug: string;
  name: string;
  description: string;
  content: string;
  read: number;
  like: number;
  status: number;
  createdDate: Date;
  updatedDate: Date;
}
