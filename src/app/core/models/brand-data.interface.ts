

export interface BrandDataResponse {
  results: number;
  metadata: BrandData;
  data: BrandData[];
}

export interface BrandData {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface BrandData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
