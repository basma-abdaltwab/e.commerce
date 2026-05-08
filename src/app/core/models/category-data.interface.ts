
export interface CategoryDataResponse {
  results: number;
  metadata: Metadata;
  data: CategoryData[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
