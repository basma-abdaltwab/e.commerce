
export interface SubCategoryDataResponse {
  results: number;
  metadata: Metadata;
  data: SubCategoryData[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface SubCategoryData {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
