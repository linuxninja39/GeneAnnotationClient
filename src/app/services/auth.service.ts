import { Injectable } from '@angular/core';
import {CookieService} from 'ng2-cookies';
import {AppUserModel} from '../models/api/app-user.model';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {TestAppUsers} from '../test-data/test-app-users.spec';

@Injectable()
export class AuthService {
  public static COOKIE_NAME = 'appUser';
  public static BASE_EP = environment.apiServerUrl + '/AppUsers';

  constructor(private cookieService: CookieService,
              private http: Http) {
  }

  get User(): AppUserModel {
    const appUserJsonString = this.cookieService.get(AuthService.COOKIE_NAME);
    if (appUserJsonString) {
      return JSON.parse(appUserJsonString);
    }
    return;
  }

  authed(): Observable<boolean> {
    return Observable.create(
      (observer: Observer<boolean>) => {
        if (this.User) {
          if (this.User.id && this.User.id > 0) {
            observer.next(true);
            observer.complete();
            return;
          }
        }
        observer.next(false);
        observer.complete();
      }
    );
  }

  authenticate(email: string): Observable<AppUserModel> {
    if (environment.frontendOnly) {
      const appUser = JSON.parse(JSON.stringify(TestAppUsers[0]));
      this.cookieService.set(AuthService.COOKIE_NAME, JSON.stringify(appUser));
      return Observable.of(appUser);
    }
    return this.http
      .post(AuthService.BASE_EP, {name: email})
      .map(
        (res: Response) => {
          const appUser: AppUserModel = res.json();
          this.cookieService.set(AuthService.COOKIE_NAME, JSON.stringify(appUser));
          return appUser;
        }
      );
  }
}

