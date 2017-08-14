import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {CookieService} from 'ng2-cookies';
import {AppUserModel} from '../models/api/app-user.model';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthedGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .authed()
      .map(
        (authed: boolean) => {
          if (!authed) {
            this.router.navigate(['/who']);
          }
          return authed;
        }
      );
  }
}

