import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateSessionResponse, PaymentDataResponse } from '../../models/payment-data.interface';
import { OrderDataResponse } from '../../models/order-data.interface';


@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly httpClient = inject(HttpClient);

  createCashOrder(cartId: string | null, data: object): Observable<PaymentDataResponse> {
    return this.httpClient.post<PaymentDataResponse>(environment.baseUrl + `/api/v1/orders/${cartId}`, data);
  }
  createUserOrders(userId: string |null): Observable<OrderDataResponse> {
    return this.httpClient.get<OrderDataResponse>(environment.baseUrl + `/api/v1/orders/user/${userId}`);
  }

  createViseOrder(cartId: string | null, data: object): Observable<CreateSessionResponse> {
    return this.httpClient.post<CreateSessionResponse>(
      environment.baseUrl +
        `/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`,data,);
  }
}
