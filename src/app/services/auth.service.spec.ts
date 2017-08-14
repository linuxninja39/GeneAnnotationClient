import {TestBed, inject} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {CookieService} from 'ng2-cookies';
import {HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {AppUserModel} from '../models/api/app-user.model';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
        CookieService,
        MockBackend,
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it(
    'should call correct http endpoint if no cookie exists',
    inject(
      [MockBackend, AuthService, CookieService],
      (mockBackend: MockBackend, authService: AuthService, cookieService: CookieService) => {
        const appUser: AppUserModel = {id: 1, name: 'joe@joe.com'};
        let lastConnection: MockConnection;
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            lastConnection = connection;
            const resOptions = new ResponseOptions({body: JSON.stringify(appUser)});
            const res = new Response(resOptions);
            connection.mockRespond(res);
          }
        );

        cookieService.delete(AuthService.COOKIE_NAME);

        authService.authenticate('joe@joe.com')
          .subscribe(
            (authedUser: AppUserModel) => {
              expect(authedUser).toBeTruthy();
              expect(lastConnection).toBeTruthy('lastConnection should have been defied in http call');
              expect(cookieService.get(AuthService.COOKIE_NAME)).toBeTruthy('cookie should have been set');
              expect(authService.User).toBeTruthy('User should have been set');
              expect(authService.User.id).toBe(appUser.id, 'id should match return from http');
            }
          );
      }
    )
  );

  it(
    'observable next should return true if cookie set and id in user',
    inject(
      [
        AuthService,
        CookieService
      ],
      (authService: AuthService, cookieService: CookieService) => {
        const userId = 1;
        cookieService.set(AuthService.COOKIE_NAME, JSON.stringify({id: userId, name: 'j@j.com'}));

        authService.authed()
          .subscribe(
            (authed: boolean) => {
              expect(authed).toBeTruthy('authed should return true');
              expect(authService.User).toBeTruthy('User should have been set');
              expect(authService.User.id).toBe(userId, 'id should match return from http');
            }
          );
      }
    )
  );

  it(
    'observable next should return false if cookie not set',
    inject(
      [
        AuthService,
        CookieService
      ],
      (authService: AuthService, cookieService: CookieService) => {
        cookieService.delete(AuthService.COOKIE_NAME);

        authService.authed()
          .subscribe(
            (authed: boolean) => {
              expect(authed).toBeFalsy('authed should return false');
            }
          );
      }
    )
  );

});
