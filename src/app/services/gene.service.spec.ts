import { TestBed, inject } from '@angular/core/testing';

import { GeneService } from './gene.service';
import {BaseRequestOptions, ConnectionBackend, Http, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('GeneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
        GeneService
      ]
    });
  });

  it('should be created', inject([GeneService], (service: GeneService) => {
    expect(service).toBeTruthy();
  }));
});
