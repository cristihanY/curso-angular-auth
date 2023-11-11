import { Component } from '@angular/core';
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';

import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent {

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  constructor( 
    private auth: AuthService,
    private tokenserv : TokenService,
    private userS : UsersService,
    ) { }


  printdata(){
    const app = this.tokenserv.getTokenDecoded();
     this.tokenserv.saveToken("mona")
    this.userS.getProfileUser()
    .subscribe({
      next: (result) => {
        console.log(result);
        console.log(app);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        // Opcional: manejar la lógica cuando la suscripción se completa
      }
    });
  }

}
