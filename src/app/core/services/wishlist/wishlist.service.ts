import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WishlistDataResponse } from '../../models/wishlist-data.interface';
import { WishlistDetailsResponse } from '../../models/wishlist-details.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  wishCount: WritableSignal<number> = signal<any>(0);

  addProductToWishlist(id:string): Observable<WishlistDataResponse>{
    return this.httpClient.post<WishlistDataResponse>(environment.baseUrl + '/api/v1/wishlist', {
      productId: id,
    });
  }

   getLoggedUserWishlist(): Observable<WishlistDetailsResponse> {
      return this.httpClient.get<WishlistDetailsResponse>(environment.baseUrl + '/api/v1/wishlist');
   }
  
  removeProductFromWishlist(id:string): Observable<WishlistDetailsResponse>{
    return this.httpClient.delete<WishlistDetailsResponse>(
      environment.baseUrl + `/api/v1/wishlist/${id}`);
  }
}
