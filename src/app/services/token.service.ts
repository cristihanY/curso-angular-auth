import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie} from 'typescript-cookie';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


    saveToken(token:string){
    setCookie('token-trello', token, {expires: 365, path: '/'})
    }
  
  getToken(){
      const token = getCookie('token-trello');
      return token;
  }
removeToken(){
   removeCookie('token-trello');
  }

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const token = this.getToken();

    if (token) {
        try {
            const decodedToken = helper.decodeToken(token);
            return decodedToken;
        } catch (error) {
            //console.error('Error decoding token:', error);
            this.removeToken();
            this
            return null;  // Otra acción según tus necesidades
        }
    } else {
      this.removeToken();
        //console.error('Token is undefined or null.');
        return null;  // Otra acción según tus necesidades
    }
}

//  saveToken(token:string){
//    localStorage.setItem('token', token);

//  }

//  getToken(){
//     const token = localStorage.getItem('token');
//     return token;
//  }
//  removeToken(){
//    localStorage.removeItem('token');
//  }
}
