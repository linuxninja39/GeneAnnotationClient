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
  public static ADD_GENE_VARIANT_LITERATURE_ANNOTATION_EP = AnnotationService.BASE_EP + '/GeneVariantLiterature/%s';
  public static ADD_LITERATURE_ANNOTATION_EP = AnnotationService.BASE_EP + '/Literature/%s';

  constructor(private http: Http) {}

  addGeneAnnotations(geneId: string | number, annotation: AnnotationModel): Observable<AnnotationModel> {
    const url = sprintf(AnnotationService.ADD_GENE_ANNOTATION_EP, geneId);
    return this.postAnnotation(url, annotation);
  }

  addGeneVariantAnnotation(geneVariantId: string | number, annotation: AnnotationModel): Observable<AnnotationModel> {
    const url = sprintf(AnnotationService.ADD_GENE_VARIANT_ANNOTATION_EP, geneVariantId, annotation);
    return this.postAnnotation(url, annotation);
  }

  addGeneVariantLiteratureAnnotation(
    geneVariantLiteratureId: string | number,
    annotation: AnnotationModel
  ): Observable<AnnotationModel> {
    const url = sprintf(AnnotationService.ADD_GENE_VARIANT_LITERATURE_ANNOTATION_EP, geneVariantLiteratureId);
    return this.postAnnotation(url, annotation);
  }

  addLiteratureAnnotation(literatureId: string | number, annotation: AnnotationModel) {
    const url = sprintf(AnnotationService.ADD_LITERATURE_ANNOTATION_EP, literatureId);
    return this.postAnnotation(url, annotation);
  }

  private postAnnotation(url: string, annotation: AnnotationModel): Observable<AnnotationModel> {
    if (!annotation.appUserId) {
      if (annotation.appUser) {
        annotation.appUserId = annotation.appUser.id;
      }
    }
    if (!annotation.appUserId) {
      throw new Error('appUserId OR appUser must be set');
    }
    annotation.appUser = null;
    log.info('posting annotation to url', annotation, url);
    return this.http.post(url, annotation).map((r) => r.json());
  }
}
