import { TestBed, inject } from '@angular/core/testing';

import { AuthedGuard } from './authed.guard';
import {CookieService} from 'ng2-cookies';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../services/auth.service';
import {HttpModule} from '@angular/http';

describe('AuthedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, AuthedGuard, CookieService],
      imports: [RouterTestingModule.withRoutes([]), HttpModule]
    });
  });

  it('should ...', inject([AuthedGuard], (guard: AuthedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
