import {TestBed, inject} from '@angular/core/testing';
import {LiteratureService} from './literature.service';
import {BaseRequestOptions, Response, HttpModule, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {TestLiteratures} from '../test-data/test-literatures.spec';

describe('LiteratureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {provide: XHRBackend, useClass: MockBackend},
        LiteratureService
      ]
    });
  });

  it('LiteratureService should be created', inject([LiteratureService], (service: LiteratureService) => {
    expect(service).toBeTruthy();
  }));

  it(
    'should do http call to get literature',
    inject(
      [
        LiteratureService,
        XHRBackend
      ],
      (service: LiteratureService, mockBackend: MockBackend) => {
        const data = JSON.parse(JSON.stringify(TestLiteratures));
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            const resOptions = new ResponseOptions({body: JSON.stringify(data)});
            const res = new Response(resOptions);
            connection.mockRespond(res);
          }
        );

        service.getLiteratures()
          .subscribe(
            (literatures) => {
              expect(literatures.length).toBe(2);
            }
          );
      }
    )
  );
});
