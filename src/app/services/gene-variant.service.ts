import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/observable/merge';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {Http, Headers, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Log} from 'ng2-logger';
import {sprintf} from 'sprintf-js';
import {GeneVariantLiteratureModel} from '../models/api/gene-variant-literature.model';
import {TestGeneVariants} from '../test-data/test-gene-variants.spec';
import {FrontEndOnlyServiceUtil} from '../front-end-only-service-util';
import {CurrentPreviousItemsService} from './current-previous-items.service';

const log = Log.create('GeneVariantService');

@Injectable()
export class GeneVariantService {
  public static readonly BASE_EP = environment.apiServerUrl + '/GeneVariants';
  public static readonly GENE_VARIANT_BY_RANGE_EP = GeneVariantService.BASE_EP + '?start=%d&end=%d';
  public static readonly GENE_VARIANT_EP = GeneVariantService.BASE_EP + '/%s';
  public static readonly GENE_VARIANT_LITERATURE_EP = GeneVariantService.GENE_VARIANT_EP + '/Literature';

  constructor(private http: Http,
              private currentPreviousItemsService: CurrentPreviousItemsService) {
  }

  getGeneVariantsByRange(start: number | string, end: number | string): Observable<GeneVariantModel[]> {
    return FrontEndOnlyServiceUtil.frontEndReturn<GeneVariantModel[]>(
      TestGeneVariants,
      this.http
        .get(sprintf(GeneVariantService.GENE_VARIANT_BY_RANGE_EP, start, end))
        .map(
          (res: Response) => {
            const geneVariants = <GeneVariantModel[]>res.json();
            geneVariants.forEach(
              (geneVariant) => this.currentPreviousItemsService.updateGeneVariantModel(geneVariant)
            );
            return geneVariants;
          }
        )
    );
  }

  getGeneVariant(id: string | number): Observable<GeneVariantModel> {
    return FrontEndOnlyServiceUtil.frontEndReturn<GeneVariantModel>(
      TestGeneVariants[0],
      this.http
        .get(sprintf(GeneVariantService.GENE_VARIANT_EP, id))
        .map(
          (res: Response) => {
            const geneVariant = <GeneVariantModel>res.json();
            this.currentPreviousItemsService.updateGeneVariantModel(geneVariant);
            return geneVariant;
          }
        )
    );
  }

  saveGeneVariant(geneVariant: GeneVariantModel): Observable<GeneVariantModel> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let ob: Observable<any>;
    if (geneVariant.id) {
      ob = this.http.put(
        sprintf(GeneVariantService.GENE_VARIANT_EP, geneVariant.id),
        JSON.stringify(geneVariant),
        {headers: headers}
      );
    } else {
      log.info('sending geneVariant', JSON.stringify(geneVariant));
      ob = this.http.post(
        GeneVariantService.BASE_EP,
        JSON.stringify(geneVariant),
        {headers: headers}
      );
    }
    return FrontEndOnlyServiceUtil.frontEndReturn(
      this.currentPreviousItemsService.updateGeneVariantModel(geneVariant),
      ob.map(
        (res: Response) => {
          const ret = <GeneVariantModel>res.json();
          this.currentPreviousItemsService.updateGeneVariantModel(ret);
          return ret;
        }
      )
    );
  }

  getLiteratures(geneVariantId: string | number): Observable<GeneVariantLiteratureModel[]> {
    return this.http.get(sprintf(GeneVariantService.GENE_VARIANT_LITERATURE_EP, geneVariantId))
      .map(
        (res: Response) => res.json()
      );
  }
}
