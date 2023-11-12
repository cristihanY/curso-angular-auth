import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {environment} from '@environments/environment';
import { TokenService } from './token.service';
import { User } from '@models/user.model';
import { BehaviorSubject, tap } from 'rxjs';
import {checkToken} from '@interceptors/token.interceptor'


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject< User | null >(null);

  constructor(
    private http: HttpClient,
    private  tokenService: TokenService,
  ) { }

  getDataUser(){
    return this.user$.getValue();
  }

  getUsers(){
    const token = this.tokenService.getToken();
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, { context: checkToken()} );
  }

  getProfileUser(){
    const token = this.tokenService.getToken();
    return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`, { context: checkToken()} ).pipe(
      tap( user => {
        this.user$.next(user);
      })
    );
  }

  
}
