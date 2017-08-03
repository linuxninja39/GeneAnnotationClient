import {TestBed, inject, async} from '@angular/core/testing';
import { Log } from 'ng2-logger';
import { GeneService } from './gene.service';
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {TestGenes} from '../test-data/test-genes.spec';
import {TestGeneNames} from '../test-data/test-gene-names.spec';
import {GeneModel} from '../models/api/gene.model';
import {CurrentPreviousItemsService} from './current-previous-items.service';

const log = Log.create('GeneService.spec');

let updateGeneModelCalled = 0;

class MockCurrentPreviousItemsService {
  updateGeneModel(arg) {
    updateGeneModelCalled++;
  }
}

describe('GeneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: CurrentPreviousItemsService, useClass: MockCurrentPreviousItemsService },
        GeneService
      ]
    });
  });

  it(
    'should be created',
    inject(
      [GeneService],
      (service: GeneService) => {
        expect(service).toBeTruthy();
      }
    )
  );

  it(
    'getGenes should add currentGeneName',
    inject(
      [
        GeneService,
        XHRBackend
      ],
      (service: GeneService, mockBackend: MockBackend) => {
        const data = TestGenes;
        const geneCount = data.length;
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            console.log('data is', data);
            const resOptions = new ResponseOptions({body: JSON.stringify(data)});
            const res = new Response(resOptions);
            connection.mockRespond(res);
          }
        );

        service.getGenes()
          .subscribe(
            (genes) => {
              expect(updateGeneModelCalled)
                .toBe(geneCount, 'updateGeneModel should be called once for each gene');
            }
          );
      }
    )
  );

  it(
    'getGene should add currentGeneName',
    inject(
      [
        GeneService,
        XHRBackend
      ],
      (service: GeneService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            const data = TestGenes[1];
            const resOptions = new ResponseOptions({body: JSON.stringify(data)});
            const res = new Response(resOptions);
            connection.mockRespond(res);
          }
        );

        updateGeneModelCalled = 0;

        service.getGene(1)
          .subscribe(
            (gene) => {
              expect(updateGeneModelCalled)
                .toBe(1, 'updateGeneModel should be called once');
            }
          );
      }
    )
  );
});

function deepCopy(obj) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' !== typeof obj) {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }

  throw new Error('Unable to copy obj! Its type isn\'t supported.');
}
