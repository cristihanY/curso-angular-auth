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

isValidToken(){
  const token = this.getToken();
  const helper = new JwtHelperService();
  if(!token){
      return false;
  }
  const decodetoken = helper.decodeToken(token);
  if(decodetoken && decodetoken?.exp){
    const tokendate = new Date(0);
    tokendate.setUTCSeconds(decodetoken.exp);
    const today = new Date();
    return tokendate.getTime() > today.getTime();
  }
  return false;
}
isValidRefreshToken(){
  const token = this.getRefreshToken();
  const helper = new JwtHelperService();
  if(!token){
      return false;
  }
  const decodetoken = helper.decodeToken(token);
  if(decodetoken && decodetoken?.exp){
    const tokendate = new Date(0);
    tokendate.setUTCSeconds(decodetoken.exp);
    const today = new Date();
    return tokendate.getTime() > today.getTime();
  }
  return false;
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

// refresh token 

saveRefreshToken(token:string){
  setCookie('refresh-token-trello', token, {expires: 365, path: '/'})
  }

getRefreshToken(){
    const token = getCookie('refresh-token-trello');
    return token;
}
removeRefreshToken(){
 removeCookie('refresh-token-trello');
}
}
