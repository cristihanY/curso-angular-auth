import { Component } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '@services/users.service';
import { User } from '@models/user.model';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user$ =  this.userService.user$;

  constructor(
    private authService : AuthService,
    private router : Router,
    private userService: UsersService,
    private tokenService: TokenService,

  ) {}



  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  iisValidToken(){
    console.log(this.tokenService.isValidToken());
  }
}
