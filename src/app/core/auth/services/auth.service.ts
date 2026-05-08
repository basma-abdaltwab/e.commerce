import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserDataResponse } from '../models/user-data.interface';
import { ForgetPasswordDataResponse, ResetCodeResponse, ResetPasswordResponse } from '../models/forget-password-data.interface';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  isLogged: WritableSignal<boolean> = signal<boolean>(false);

  sendRegisterData(data: object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(
      environment.baseUrl + '/api/v1/auth/signup',
      data,
    );
  }
  sendLoginData(data: object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(
      environment.baseUrl + '/api/v1/auth/signin',
      data,
    );
  }

  forgotPassword(data: object): Observable<ForgetPasswordDataResponse> {
    return this.httpClient.post<ForgetPasswordDataResponse>(
      environment.baseUrl + '/api/v1/auth/forgotPasswords',
      data,
    );
  }

  verifyResetCode(data: object): Observable<ResetCodeResponse> {
    return this.httpClient.post<ResetCodeResponse>(
      environment.baseUrl + '/api/v1/auth/verifyResetCode',
      data,
    );
  }

  resetPassword(data: object): Observable<ResetPasswordResponse> {
    return this.httpClient.put<ResetPasswordResponse>(
      environment.baseUrl + '/api/v1/auth/resetPassword',
      data,
    );
  }


  signOut(): void{
    // remove token
    localStorage.removeItem('freshToken')
    // remove freshuser
    localStorage.removeItem('freshUser')

    // remove userData

    localStorage.removeItem('userData')
    // change islogged
    this.isLogged.set(false)
    // navigate to login
    this.router.navigate(['/login'])
  }


  decodeUserToken(): void{
    

    const token = localStorage.getItem('freshToken')

    if (token) {
      const userData = jwtDecode(token);

      localStorage.setItem('userData' , JSON.stringify(userData))
    }
    }

    
}
