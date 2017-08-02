import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GeneModel} from '../models/api/gene.model';
import {Observable} from 'rxjs/Observable';
import { Log } from 'ng2-logger';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import 'rxjs/add/operator/map';
import {GeneNameModel} from '../models/api/gene-name.model';

const log = Log.create('GeneService');

@Injectable()
export class GeneService {

  constructor(private http: Http) {
  }

  getGene(id: string | number): Observable<GeneModel> {
        return this.http
      .get('http://localhost:5000/api/genes/' + id)
      .map(
        (res, num) => {
          const gene: GeneModel = res.json();
          gene.currentGeneName = this.getCurrentGeneName(gene);
          return gene;
        }
      );
  }

  getGenes(page?: string | number): Observable<GeneModel[]> {
    return this.http
      .get('http://localhost:5000/api/genes')
      .map(
        (res, num) => {
          const genes: Array<GeneModel> = res.json();
          for (const gene of genes) {
            gene.currentGeneName = this.getCurrentGeneName(gene);
          }
          return genes;
        }
      );
  }

  getGeneVariant(id: string): Observable<GeneVariantModel> {
    return null;
  }

  private getCurrentGeneName(gene: GeneModel): GeneNameModel {
    gene.geneName.sort(
      (a, b) => {
        if (a.activeDate < b.activeDate) {
          return -1;
        }
        if (a.activeDate > b.activeDate) {
          return 1;
        }
        return 0;
      }
    );

    return gene.geneName.pop();
  }
}
