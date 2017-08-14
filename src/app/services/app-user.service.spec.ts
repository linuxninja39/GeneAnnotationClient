import { TestBed, inject } from '@angular/core/testing';

import { AppUserService } from './app-user.service';
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('AppUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AppUserService]
    });
  });

  it('should be created', inject([AppUserService], (service: AppUserService) => {
    expect(service).toBeTruthy();
  }));
});
