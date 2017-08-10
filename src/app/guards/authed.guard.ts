import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {CookieService} from 'ng2-cookies';

@Injectable()
export class AuthedGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.cookieService.get('appUser')) {
      return true;
    } else {
      this.router.navigate(['/who']);
    }
    return false;
  }
}
