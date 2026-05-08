import { SubcategoriesResponse } from './../../models/subcategories.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoryDataResponse } from '../../models/category-data.interface';
import { SubCategoryData, SubCategoryDataResponse } from '../../models/sub-category-data.interface';

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesService {
  private readonly httpClient = inject(HttpClient);

  getAllSubCategories(): Observable<CategoryDataResponse> {
    return this.httpClient.get<CategoryDataResponse>(environment.baseUrl + '/api/v1/categories');
  }
  getAllSpecificCategories(subcategoryId: string |null): Observable<SubcategoriesResponse> {
    return this.httpClient.get<SubcategoriesResponse>(environment.baseUrl + `/api/v1/subcategories/${subcategoryId}`);
  }

 
}
