import {TestBed, inject, fakeAsync} from '@angular/core/testing';

import { AnnotationService } from './annotation.service';
import {
  BaseRequestOptions, Response, HttpModule, ResponseOptions, XHRBackend,
  ResponseContentType, RequestMethod
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {TestAnnotations} from '../test-data/test-annotations.spec';
import {AnnotationModel} from '../models/api/annotation.model';
import {sprintf} from 'sprintf-js';

describe('AnnotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        AnnotationService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should be created', inject([AnnotationService], (service: AnnotationService) => {
    expect(service).toBeTruthy();
  }));

  it(
    'addGeneAnnotation should post to correct url',
    inject(
      [
        XHRBackend,
        AnnotationService
      ],
      (mockBackend: MockBackend, service: AnnotationService) => {
        const data = JSON.parse(JSON.stringify(TestAnnotations[0]));
        let lastConnection: MockConnection;
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            lastConnection = connection;
            const resOptions = new ResponseOptions({body: JSON.stringify(data)});
            const res = new Response(resOptions);
            connection.mockRespond(res);
          }
        );
        const geneId = 1;
        service
          .addGeneAnnotations(
            geneId,
            data
          )
          .subscribe(
            (annotation: AnnotationModel) => {
              expect(lastConnection.request.url).toBe(
                sprintf(AnnotationService.ADD_GENE_ANNOTATION_EP, geneId)
              );
              expect(lastConnection.request.method).toBe(RequestMethod.Post);
              expect(
                JSON.stringify(
                  JSON.parse(
                    lastConnection.request.getBody()
                  )
                )
              ).toBe(JSON.stringify(data));
            }
          );

      }
    )
  );
});
