import {TestBed, inject, async} from '@angular/core/testing';
import { Log } from 'ng2-logger';
import { GeneService } from './gene.service';
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {TestGenes} from '../test-data/test-genes.spec';
import {TestGeneNames} from '../test-data/test-gene-names.spec';

const log = Log.create('GeneService.spec');

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
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            const data = TestGenes;
            console.log('data is', data);
            const resOptions = new ResponseOptions({body: JSON.stringify(data)});
            const res = new Response(resOptions);
            connection.mockRespond(res);
          }
        );

        service.getGenes()
          .subscribe(
            (genes) => {
              expect(genes[0].currentGeneName.name)
                .toEqual(TestGeneNames[0].name, 'currentGeneName should be set correctly');
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

        service.getGene(1)
          .subscribe(
            (gene) => {
              expect(gene.currentGeneName.name)
                .toEqual(TestGeneNames[1].name, 'currentGeneName should be set correctly from getGene');
            }
          );
      }
    )
  );
});
