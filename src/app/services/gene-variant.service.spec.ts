import { TestBed, inject } from '@angular/core/testing';

import { GeneVariantService } from './gene-variant.service';
import {BaseRequestOptions, HttpModule, ResponseOptions, XHRBackend, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {TestGeneVariants} from '../test-data/test-gene-variants.spec';
import {GeneVariantModel} from '../models/api/gene-variant.model';

describe('GeneVariantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        { provide: XHRBackend, useClass: MockBackend },
        GeneVariantService,
      ]
    });
  });

  it('should be created', inject([GeneVariantService], (service: GeneVariantService) => {
    expect(service).toBeTruthy();
  }));

  it(
    'get object',
    inject(
      [
        GeneVariantService,
        XHRBackend
      ],
      (service: GeneVariantService, mockBackend: MockBackend) => {
        const origGeneVariant = TestGeneVariants[0];
        const gvString = JSON.stringify(origGeneVariant);
        console.log(gvString);
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            const resOptions = new ResponseOptions({body: gvString});
            const res = new Response(resOptions);
            connection.mockRespond(res);
          }
        );

        service.getGeneVariant(1)
          .subscribe(
            (geneVariant: GeneVariantModel) => {
              expect(JSON.stringify(geneVariant)).toEqual(JSON.stringify(origGeneVariant));
            }
          );

        service.saveGeneVariant(origGeneVariant)
          .subscribe(
            (geneVariant: GeneVariantModel) => {
              expect(JSON.stringify(geneVariant)).toEqual(JSON.stringify(origGeneVariant));
            }
          );
      }
    )
  );
});
