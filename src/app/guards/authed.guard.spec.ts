import { TestBed, async, inject } from '@angular/core/testing';

import { AuthedGuard } from './authed.guard';
import {CookieService} from 'ng2-cookies';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthedGuard, CookieService],
      imports: [RouterTestingModule.withRoutes([])]
    });
  });

  it('should ...', inject([AuthedGuard], (guard: AuthedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
