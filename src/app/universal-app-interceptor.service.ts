import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie';
@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  // constructor( private authService: AuthService,private cookie: CookieService) { }
  constructor(private cookie: CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.cookie.get('token');
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `${token}`
      }
    });
    console.log(req,"req");
    return next.handle(req);
  }
}
