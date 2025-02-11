import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '@environments/environment';
import { switchMap, tap} from 'rxjs';

import { TokenService } from './token.service';
import { ResponseLogin } from '@models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private  tokenService: TokenService,
  ) { }

  login(email: string, password: string) {
      return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password
      })
      .pipe(
        tap(response => {
          this.tokenService.saveToken( response.access_token);
          this.tokenService.saveRefreshToken(response.refresh_token);
        })
      );
  }

  refresLogin(refreshToken: string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/refresh-token`, {refreshToken})
    .pipe(
      tap(response => {
        this.tokenService.saveToken( response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
  }

  register(name: string, email: string, password: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      name,
      email,
      password
      })
  }

  registerAndLogin(name: string, email: string, password: string){
    return this.register(name, email,password)
      .pipe(
        switchMap(() => this.login(email,password))
      )
  }

  isAvailable(email: string){
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`,{email})
  }

  recovery(email: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`,{email})
  }

  changePassword(token: string, newPassword: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`,{token, newPassword})
  }

  logout(){
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }
}
