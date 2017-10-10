import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GeneModel} from '../models/api/gene.model';
import {Observable} from 'rxjs/Rx';
import {Log} from 'ng2-logger';
import 'rxjs/add/operator/map';
import {CurrentPreviousItemsService} from './current-previous-items.service';
import {environment} from '../../environments/environment';
import {TestGenes} from '../test-data/test-genes.spec';
import {FrontEndOnlyServiceUtil} from '../front-end-only-service-util';

const log = Log.create('GeneService');

@Injectable()
export class GeneService {

  constructor(private http: Http, private currentPreviousItemsService: CurrentPreviousItemsService) {
  }

  getGene(id: string | number): Observable<GeneModel> {
    return FrontEndOnlyServiceUtil.frontEndReturn<GeneModel>(
      TestGenes[0],
      this.http
        .get('http://localhost:5000/api/genes/' + id)
        .map(
          (res, num) => {
            const gene: GeneModel = res.json();
            log.info('got gene', gene);
            this.currentPreviousItemsService.updateGeneModel(gene);
            return gene;
          }
        )
    );
  }

  getGenesByRange(start: number, end: number): Observable<GeneModel[]> {
    if (environment.frontendOnly) {
      return Observable.of(JSON.parse(JSON.stringify(TestGenes)));
    }
    return this.http
      .get('http://localhost:5000/api/genes?start=' + start + '&end=' + end)
      .map(
        (res, num) => {
          const genes: Array<GeneModel> = res.json();
          for (const gene of genes) {
            this.currentPreviousItemsService.updateGeneModel(gene);
          }
          return genes;
        }
      );
  }

  getGenes(page?: string | number): Observable<GeneModel[]> {
    if (environment.frontendOnly) {
      return Observable.of(JSON.parse(JSON.stringify(TestGenes)));
    }
    return this.http
      .get('http://localhost:5000/api/genes')
      .map(
        (res, num) => {
          const genes: Array<GeneModel> = res.json();
          for (const gene of genes) {
            this.currentPreviousItemsService.updateGeneModel(gene);
          }
          return genes;
        }
      );
  }
}

