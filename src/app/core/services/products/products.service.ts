import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductsDataResponse } from '../../models/products-data.interface';
import { ProductDetailsResponse } from '../../models/product-details.interface';
import { ReviewsDetailsResponse } from '../../models/reviews-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getAllProduct(page: number = 1, limit: number = 10): Observable<ProductsDataResponse> {
    return this.httpClient.get<ProductsDataResponse>(
      environment.baseUrl + `/api/v1/products?page=${page}&limit=${limit}`,
    );
  }

  getSpecificProducts(productId: string | null): Observable<ProductDetailsResponse> {
    return this.httpClient.get<ProductDetailsResponse>(
      environment.baseUrl + `/api/v1/products/${productId}`,
    );
  }

  getProductsByBrand(brandId: string): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
  }

 


  getProductsBySearch(keyword: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?keyword=${keyword}`,
    );
  }


  getReviewProduct(id:string |null): Observable<ReviewsDetailsResponse> {
    return this.httpClient.get<ReviewsDetailsResponse>(environment.baseUrl + `/api/v1/products/${id}/reviews`);
  }
}
