

export interface ReviewsDetailsResponse {
  results: number;
  metadata: ReviewsDetails;
  data: ReviewsDetails[];
}

export interface ReviewsDetails {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface ReviewsDetails {
  _id: string;
  rating: number;
  review: string;
  product: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
}
