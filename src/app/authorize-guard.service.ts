import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from './jwttoken.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardService implements CanActivate {
  constructor(
    private loginService: LoginService,
  private jwtService: JWTTokenService,
  private router:Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
      // console.log("enter canactive");
      // console.log(this.jwtService.getUser());
      if (this.jwtService.getUser()) {
          // console.log("get user",this.jwtService.getUser() )
          if (this.jwtService.isTokenExpired()) {
            // Should Redirect Sig-In Page
            console.log("redirect through CANACTIVE - TOKEN EXPIRE")
            this.router.navigate(['/login']);
          } else {
            return true;
          }
      } else {
            console.log("redirect through CANACTIVE - INVALID USER")
            this.router.navigate(['/login']);
        // return new Promise((resolve) => {
        //   this.loginService.signIncallBack().then((e) => {
        //      resolve(true);
        //   }).catch((e) => {
        //     // Should Redirect Sign-In Page
        //   });
        // }
        // );
      }
  }

  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
  //     console.log("canactivechld");
  //     // console.log("enter canactive");
  //     // console.log(this.jwtService.getUser());
  //     if (this.jwtService.getUser()) {
  //         // console.log("get user",this.jwtService.getUser() )
  //         if (this.jwtService.isTokenExpired()) {
  //           // Should Redirect Sig-In Page
  //           console.log("redirect through CANACTIVE - TOKEN EXPIRE")
  //           this.router.navigate(['/login']);
  //         } else {
  //           this.router.navigate(['/homepage']);
  //           return true;
  //         }
  //     } else {
  //           console.log("redirect through CANACTIVE - INVALID USER")
  //           this.router.navigate(['/login']);
  //       // return new Promise((resolve) => {
  //       //   this.loginService.signIncallBack().then((e) => {
  //       //      resolve(true);
  //       //   }).catch((e) => {
  //       //     // Should Redirect Sign-In Page
  //       //   });
  //       // }
  //       // );
  //     }
  // }
}
