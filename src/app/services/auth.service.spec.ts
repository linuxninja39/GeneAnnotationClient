import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {CookieService} from 'ng2-cookies';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, CookieService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
