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

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    
    const token = this.tokenService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Obtener el userId del token
    const tokenData = this.tokenService.getTokenDecoded();
    if(token !== null && tokenData !== null){
      const userIdFromToken = tokenData.userId;

      return this.userService.getProfileUser().pipe(
        mergeMap((result) => {
          if (userIdFromToken === result.id) {
            return of(true);
          } else {
            this.router.navigate(['/login']);
            return of(false);
          }
        })
      );
    } else {
      this.router.navigate(['/login']);
    }
    return false;

  }

  
  
}
