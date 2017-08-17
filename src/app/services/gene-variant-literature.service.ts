import { Injectable } from '@angular/core';
import {GeneVariantLiteratureModel} from '../models/api/gene-variant-literature.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GeneVariantLiteratureService {

  constructor() { }

  // TODO: unit test and write api
  addGeneVariantLiterature(geneVariantLiterature: GeneVariantLiteratureModel): Observable<GeneVariantLiteratureModel> {
    return Observable.of(geneVariantLiterature);
  }

}
