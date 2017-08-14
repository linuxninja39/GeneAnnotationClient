import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LiteratureModel} from '../models/api/literature.model';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {sprintf} from 'sprintf-js';

@Injectable()
export class LiteratureService {
  public static BASE_EP: string = environment.apiServerUrl + '/literatures';
  public static ADD_GENE_VARIANT_LITERATURE_EP: string = environment.apiServerUrl + '/Literatures/%s/%s';

  constructor(
    private http: Http
  ) {
  }

  getLiteratures(page?: number): Observable<LiteratureModel[]> {
    return this.http
      .get(LiteratureService.BASE_EP)
      .map((res: Response) => <LiteratureModel[]>res.json())
  }

  addGeneVariantLiterature(geneVariantId: number | string, literatureId: number | string): Observable<LiteratureModel> {
    return this.http
      .post(sprintf(LiteratureService.ADD_GENE_VARIANT_LITERATURE_EP, geneVariantId, literatureId), '')
      .map((res: Response) => <LiteratureModel>res.json())
  }

}
