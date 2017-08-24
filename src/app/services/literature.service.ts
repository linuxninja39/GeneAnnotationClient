import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LiteratureModel} from '../models/api/literature.model';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {sprintf} from 'sprintf-js';
import {GeneVariantLiteratureModel} from '../models/api/gene-variant-literature.model';
import {FrontEndOnlyServiceUtil} from '../front-end-only-service-util';

const TestLiteratures: LiteratureModel[] = [
  {
    title: 'lit 1',
    url: 'http://lit1.com',
    pubMedId: '1',
    details: 'cool',
    author: [
      {
        id: 1,
        name: 'Bob the cool author'
      }
    ]
  },
    {
    title: 'lit 2',
    url: 'http://lit2.com',
    author: [
      {
        id: 2,
        name: 'Cracks of fear'
      }
    ]
  }
];

@Injectable()
export class LiteratureService {
  public static BASE_EP = environment.apiServerUrl + '/Literatures';
  public static ADD_GENE_VARIANT_LITERATURE_EP = LiteratureService.BASE_EP + '/%s/GeneVariant/%s';

  constructor(private http: Http) {
  }

  getLiteratures(page?: number): Observable<LiteratureModel[]> {
    return FrontEndOnlyServiceUtil.frontEndReturn<LiteratureModel[]>(
      TestLiteratures,
      this.http
        .get(LiteratureService.BASE_EP)
        .map((res: Response) => <LiteratureModel[]>res.json())
    );
  }

  addGeneVariantLiterature(geneVariantId: number | string, literatureId: number | string): Observable<GeneVariantLiteratureModel> {
    return this.http
      .post(sprintf(LiteratureService.ADD_GENE_VARIANT_LITERATURE_EP, literatureId, geneVariantId), '')
      .map((res: Response) => <GeneVariantLiteratureModel>res.json());
  }

  // TODO: write unit tests and api
  saveLiterature(literature: LiteratureModel): Observable<LiteratureModel> {
    return FrontEndOnlyServiceUtil.frontEndReturn<LiteratureModel>(
      literature,
      Observable.of(literature)
    );
  }

}
