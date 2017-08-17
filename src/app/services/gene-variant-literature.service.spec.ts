import { TestBed, inject } from '@angular/core/testing';

import { GeneVariantLiteratureService } from './gene-variant-literature.service';

describe('GeneVariantLiteratureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneVariantLiteratureService]
    });
  });

  it('should be created', inject([GeneVariantLiteratureService], (service: GeneVariantLiteratureService) => {
    expect(service).toBeTruthy();
  }));
});
