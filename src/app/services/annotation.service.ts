import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {GeneModel} from '../models/api/gene.model';
import {AnnotationModel} from '../models/api/annotation.model';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {sprintf} from 'sprintf-js';

@Injectable()
export class AnnotationService {
  public static BASE_EP: string = environment.apiServerUrl + '/Annotations';
  public static ADD_GENE_ANNOTATION_EP = AnnotationService.BASE_EP + '/gene/%s';

  constructor(private http: Http) {}

  addGeneAnnotations(geneId: string | number, annotation: AnnotationModel): Observable<AnnotationModel> {
    const url = sprintf(AnnotationService.ADD_GENE_ANNOTATION_EP, geneId);
    annotation.appUserId = annotation.appUser.id;
    annotation.appUser = null;
    return this.http.post(url, annotation).map((r) => r.json());
  }

}
