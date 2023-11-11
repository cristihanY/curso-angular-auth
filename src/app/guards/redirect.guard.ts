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

  canActivate() {
    const token = this.tokenService.getToken();
    if(token){
      this.router.navigate(['/app']);
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
 }
 return true;


  }
  
}
