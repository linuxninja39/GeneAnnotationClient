import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {Http, Headers, Response} from '@angular/http';
import {environment} from '../../environments/environment';

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
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let ob: Observable<any>;
    if (geneVariant.id) {
      ob = this.http.put(
        this.url + '/' + geneVariant.id,
        JSON.stringify(geneVariant),
        { headers: headers }
      );
    } else {
      ob = this.http.post(
        this.url,
        JSON.stringify(geneVariant),
        { headers: headers }
      );
    }
    return ob.map((res: Response) => res.json());
  }
}
