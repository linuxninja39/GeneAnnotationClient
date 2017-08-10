import { Injectable } from '@angular/core';
import {CookieService} from 'ng2-cookies';

@Injectable()
export class AuthService {

  constructor(
    private cookieService: CookieService
  ) { }

  get User() {
    return this.cookieService.get('appUser');
  }
}
