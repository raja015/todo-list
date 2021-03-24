import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {AppCookieService} from './app-cookie.service'
@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

    jwtToken: string;
    decodedToken: { [key: string]: string };

    constructor(private cookie:AppCookieService) {
    }



    // decodeToken() {
    //   this.jwtToken=this.cookie.get("token");
    //   if (this.jwtToken) {
    //   this.decodedToken = jwt_decode(this.jwtToken);
    //   }
    // }

    getDecodeToken() {
      this.jwtToken=this.cookie.get("token");
      if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
      }
      return jwt_decode(this.jwtToken);
    }

    getUser() {
      this.getDecodeToken();
      // console.log(this.decodedToken,"decoded token")
      return this.decodedToken ? this.decodedToken.id : null;
    }

    getEmailId() {
      this.getDecodeToken();
      return this.decodedToken ? this.decodedToken.email : null;
    }

    getExpiryTime() {
      this.getDecodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {
      const expiryTime: number = Number(this.getExpiryTime());
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}
