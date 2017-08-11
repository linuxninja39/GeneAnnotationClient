import { Injectable } from '@angular/core';
import {CookieService} from 'ng2-cookies';
import {AppUserModel} from '../models/api/app-user.model';

@Injectable()
export class AuthService {

  constructor(
    private cookieService: CookieService
  ) { }

  get User(): AppUserModel {
    const appUserJsonString = this.cookieService.get('appUser');
    if (appUserJsonString) {
      return JSON.parse(appUserJsonString);
    }
    return;
  }
}
