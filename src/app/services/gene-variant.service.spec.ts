import { TestBed, inject } from '@angular/core/testing';

import { GeneVariantService } from './gene-variant.service';
import {BaseRequestOptions, HttpModule, ResponseOptions, XHRBackend, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {CurrentPreviousItemsService} from './current-previous-items.service';
import {AppUserModel} from '../models/api/app-user.model';
import {PathogenicSupportCategory} from '../models/api/pathogenic-support-category.model';
import {TestGeneVariants} from '../test-data/test-gene-variants.spec';



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
        CurrentPreviousItemsService
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
        XHRBackend,
        CurrentPreviousItemsService
      ],
      (service: GeneVariantService, mockBackend: MockBackend, currentPreviousItemService: CurrentPreviousItemsService) => {
        const gvString = JSON.stringify(TestGeneVariants[0]);
        const origGeneVariant = JSON.parse(gvString);
        currentPreviousItemService.updateGeneVariantModel(origGeneVariant);
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
              console.log(geneVariant, origGeneVariant);
              const tf = objectEquals(geneVariant, origGeneVariant);
              console.log(tf);
              expect(tf).toBeTruthy();
            }
          );

        service.saveGeneVariant(origGeneVariant)
          .subscribe(
            (geneVariant: GeneVariantModel) => {
              const tf = objectEquals(geneVariant, origGeneVariant);
              expect(tf).toBeTruthy();
            }
          );
      }
    )
  );
});

function objectEquals(x, y) {
  'use strict';

  if (x === null || x === undefined || y === null || y === undefined) {
    return logWhy(x, y);
  }
  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) { console.log('constructors dont match'); return false; }
  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) { return logWhy(x, y); }
  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) { return logWhy(x,y); }
  if (x === y || x.valueOf() === y.valueOf()) { return true; }
  if (Array.isArray(x) && x.length !== y.length) { console.log('array length doesnt match'); return false; }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) { console.log('um, a date?'); return false; }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) { console.log('x not an object?'); return false; }
  if (!(y instanceof Object)) { console.log('y not an object?'); return false; }

  // recursive object equality check
  const p = Object.keys(x);
  return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
    p.every(function (i) { return objectEquals(x[i], y[i]); });
}

function logWhy(x, y) {
  const ret = x === y;
  if (!ret) {
    console.log('x does not equal y', x, y);
  }
  return ret;
}
