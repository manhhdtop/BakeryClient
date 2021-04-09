export interface Category {
  id: number;
  name: string;
  description: string;
  parent: Category;
  createdDate: Date;
  updatedDate: Date;
  status: number;
}
