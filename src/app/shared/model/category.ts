export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: Category;
  createdDate: Date;
  updatedDate: Date;
  status: number;
}
