import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/observable/merge';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {Http, Headers, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import { Log } from 'ng2-logger';
import {sprintf} from 'sprintf-js';
import {GeneVariantLiteratureModel} from '../models/api/gene-variant-literature.model';

const log = Log.create('GeneVariantService');

@Injectable()
export class GeneVariantService {
  public static readonly BASE_EP = environment.apiServerUrl + '/GeneVariants';
  public static readonly GENE_VARIANT_EP = GeneVariantService.BASE_EP + '/%s';
  public static readonly GENE_VARIANT_LITERATURE_EP = GeneVariantService.GENE_VARIANT_EP + '/Literature';

  constructor(
    private http: Http
  ) {
  }

  getGeneVariant(id: string | number): Observable<GeneVariantModel> {
    return this.http
      .get(sprintf(GeneVariantService.GENE_VARIANT_EP, id))
      .map(
        (res: Response) => <GeneVariantModel>res.json()
      )
      ;
  }

  saveGeneVariant(geneVariant: GeneVariantModel): Observable<GeneVariantModel> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let ob: Observable<any>;
    if (geneVariant.id) {
      ob = this.http.put(
        sprintf(GeneVariantService.GENE_VARIANT_EP, geneVariant.id),
        JSON.stringify(geneVariant),
        { headers: headers }
      );
    } else {
      log.info('sending geneVariant', JSON.stringify(geneVariant));
      ob = this.http.post(
        GeneVariantService.BASE_EP,
        JSON.stringify(geneVariant),
        { headers: headers }
      );
    }
    return ob.map((res: Response) => <GeneVariantModel>res.json());
  }

  getLiteratures(geneVariantId: string | number): Observable<GeneVariantLiteratureModel[]> {
    return this.http.get(sprintf(GeneVariantService.GENE_VARIANT_LITERATURE_EP, geneVariantId))
      .map(
        (res: Response) => res.json()
      );
  }
}
