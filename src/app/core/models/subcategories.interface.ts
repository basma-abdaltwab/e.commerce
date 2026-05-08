
export interface SubcategoriesResponse {
  data: Subcategories;
}

export interface Subcategories {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
