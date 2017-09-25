import { TestBed, inject } from '@angular/core/testing';

import { VariantTypeService } from './variant-type.service';

describe('VariantTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariantTypeService]
    });
  });

  it('should be created', inject([VariantTypeService], (service: VariantTypeService) => {
    expect(service).toBeTruthy();
  }));
});
