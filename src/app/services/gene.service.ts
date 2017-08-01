import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GeneModel} from '../models/api/gene.model';
import {Observable} from 'rxjs/Observable';
import { Log } from 'ng2-logger';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import 'rxjs/add/operator/map';

const log = Log.create('GeneService');

@Injectable()
export class GeneService {

  constructor(private http: Http) {
  }

  getGene(id: string): Observable<GeneModel> {
        return this.http
      .get('http://localhost:5000/api/genes/' + id)
      .map(
        (res, num) => {
          log.info('res is: ', res);
          const ret: GeneModel = res.json();
          log.info('ret is: ', ret);
          return ret;
        }
      );
  }

  getGenes(page?: number): Observable<GeneModel[]> {
    return this.http
      .get('http://localhost:5000/api/genes')
      .map(
        (res, num) => {
          log.info('res is: ', res);
          const ret: Array<GeneModel> = res.json();
          log.info('ret is: ', ret);
          return ret;
        }
      );
  }

  getGeneVariant(id: string): Observable<GeneVariantModel> {
    return null;
  }
}
