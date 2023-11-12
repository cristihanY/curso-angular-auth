import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  CanActivate} from '@angular/router';
import { Observable, of } from 'rxjs';


import { TokenService } from '@services/token.service';
import { UsersService } from '@services/users.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: UsersService
  ) {

  }

  canActivate(): boolean {
    
    const token = this.tokenService.isValidRefreshToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  
  
}
