import { TestBed, inject } from '@angular/core/testing';

import { LiteratureService } from './literature.service';

describe('LiteratureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiteratureService]
    });
  });

  it('should be created', inject([LiteratureService], (service: LiteratureService) => {
    expect(service).toBeTruthy();
  }));
});
