import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BrandDataResponse } from '../../models/brand-data.interface';
import { BrandDetailsResponse } from '../../models/brand-details.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly httpClient = inject(HttpClient);

  getAllbrands(): Observable<BrandDataResponse> {
    return this.httpClient.get<BrandDataResponse>(environment.baseUrl + '/api/v1/brands');
  }

  getAllSpecificBrand(brandId: string | null): Observable<BrandDetailsResponse> {
    return this.httpClient.get<BrandDetailsResponse>(
      environment.baseUrl + `/api/v1/brands/${brandId}`,
    );
  }



}
