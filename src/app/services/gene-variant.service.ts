import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/observable/merge';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {Http, Headers, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import { Log } from 'ng2-logger';

const log = Log.create('GeneVariantService');

@Injectable()
export class GeneVariantService {
  private static readonly BASE = 'GeneVariants';

  private url: string;

  constructor(
    private http: Http
  ) {
    this.url = environment.apiServerUrl + '/' + GeneVariantService.BASE;
  }

  getGeneVariant(id: string | number): Observable<GeneVariantModel> {
    return this.http
      .get(this.url + '/' + id)
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
        this.url + '/' + geneVariant.id,
        JSON.stringify(geneVariant),
        { headers: headers }
      );
    } else {
      log.info('sending geneVariant', JSON.stringify(geneVariant));
      ob = this.http.post(
        this.url,
        JSON.stringify(geneVariant),
        { headers: headers }
      );
    }
    return ob.map((res: Response) => <GeneVariantModel>res.json());
  }
}
