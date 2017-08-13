import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {GeneModel} from '../models/api/gene.model';
import {AnnotationModel} from '../models/api/annotation.model';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {sprintf} from 'sprintf-js';
import {Log} from 'ng2-logger';
import {GeneVariantModel} from '../models/api/gene-variant.model';

const log = Log.create('AnnotationService');

@Injectable()
export class AnnotationService {
  public static BASE_EP = environment.apiServerUrl + '/Annotations';
  public static ADD_GENE_ANNOTATION_EP = AnnotationService.BASE_EP + '/gene/%s';
  public static ADD_GENE_VARIANT_ANNOTATION_EP = AnnotationService.BASE_EP + '/GeneVariant/%s';

  constructor(private http: Http) {}

  addGeneAnnotations(geneId: string | number, annotation: AnnotationModel): Observable<AnnotationModel> {
    const url = sprintf(AnnotationService.ADD_GENE_ANNOTATION_EP, geneId);
    return this.postAnnotation(url, geneId, annotation);
  }

  addGeneVariantAnnotation(geneVariantId: string | number, annotation: AnnotationModel): Observable<AnnotationModel> {
    const url = sprintf(AnnotationService.ADD_GENE_VARIANT_ANNOTATION_EP, geneVariantId, annotation);
    return this.postAnnotation(url, geneVariantId, annotation);
  }

  private postAnnotation(url: string, id: string | number, annotation: AnnotationModel): Observable<AnnotationModel> {
    annotation.appUserId = annotation.appUser.id;
    annotation.appUser = null;
    log.info('posting annotation', annotation, id);
    return this.http.post(url, annotation).map((r) => r.json());
  }
}
