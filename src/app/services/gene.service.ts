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
import {GeneQueryModel} from '../models/query-models/gene-query-model';

const log = Log.create('GeneService');

@Injectable()
export class GeneService {

  public queryCount: number;

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
            gene.knownFunction = gene.knownFunction? gene.knownFunction: 'n/a';
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

  getGenes(geneQueryModel?: GeneQueryModel): Observable<GeneModel[]> {
    if (environment.frontendOnly) {
      return Observable.of(JSON.parse(JSON.stringify(TestGenes)));
    }
    var params = [];
    var url = 'http://localhost:5000/api/genes';
    var countUrl = 'http://localhost:5000/api/genes/count';
    log.info('geneQueryModel', geneQueryModel);
    if (geneQueryModel) {
      if (geneQueryModel.pageCount != null && geneQueryModel.pageStart != null) {
        params.push('pageStart=' + geneQueryModel.pageStart);
        params.push('pageCount=' + geneQueryModel.pageCount);
      }
      if (geneQueryModel.globalFilter != null && geneQueryModel.globalFilter != '') {
        params.push('globalFilter=' + geneQueryModel.globalFilter);
        countUrl += '?globalFilter=' + geneQueryModel.globalFilter;
      }
    }
    url += '?' + params.join('&');
    log.info('url', url);
    log.info('countUrl', countUrl);
    return this.http
      .get(countUrl)
      .mergeMap(
        (res) => {
          this.queryCount = res.json();
          log.info('count', this.queryCount);
          return this.http.get(url)
        }
      )
      .map(
        (res, num) => {
          const genes: Array<GeneModel> = res.json();
          log.info('got genes', genes);
          for (const gene of genes) {
            this.currentPreviousItemsService.updateGeneModel(gene);
            gene.knownFunction = gene.knownFunction? gene.knownFunction: 'n/a';
          }
          return genes;
        }
      );
  }
}

