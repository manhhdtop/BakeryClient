export interface MenuCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  childs: MenuCategory[];
}
