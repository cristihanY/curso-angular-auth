import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { TokenService } from '@services/token.service';
import { Observable , of} from 'rxjs';
import { UsersService } from '@services/users.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: UsersService
  ) {

  }

  canActivate(): boolean {
    const token = this.tokenService.isValidRefreshToken();
    if(token){
      this.router.navigate(['/app']);
      
    }

 return true;


  }
  
}
