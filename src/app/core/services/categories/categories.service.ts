import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoryDataResponse } from '../../models/category-data.interface';
import { CategorydetailsResponse } from '../../models/categorydetails.interface';
import { SubCategoryDataResponse } from '../../models/sub-category-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);

  getAllCategories(): Observable<CategoryDataResponse> {
    return this.httpClient.get<CategoryDataResponse>(environment.baseUrl + '/api/v1/categories');
  }
  getSpecificCategories(categoryId: string | null): Observable<CategorydetailsResponse> {
    return this.httpClient.get<CategorydetailsResponse>(
      environment.baseUrl + `/api/v1/categories/${categoryId}`,
    );
  }

  getAllSubCategories(subcategoryId:string | null): Observable<SubCategoryDataResponse>{
    return this.httpClient.get<SubCategoryDataResponse>(
      environment.baseUrl + `/api/v1/categories/${subcategoryId}/subcategories`,
    );
  }
}
