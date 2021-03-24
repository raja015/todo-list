import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
    providedIn: 'root',
  })
export class AppCookieService {

    constructor(private cookieService: CookieService) {

    }

    get(key: string) {

        return this.cookieService.get(key);
    }

    // remove(key: string) {
    //   document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    // }

    set(key: string, value: string) {
      this.cookieService.put(key, value);
    }
}
