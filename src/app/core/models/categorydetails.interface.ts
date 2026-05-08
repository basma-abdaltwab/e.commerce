export interface Categorydetails {}

export interface CategorydetailsResponse {
  data: Categorydetails;
}

export interface Categorydetails {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}




