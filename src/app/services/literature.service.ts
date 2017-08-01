import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LiteratureModel} from '../models/api/literature.model';

@Injectable()
export class LiteratureService {
  static readonly YO = 'yo';

  constructor() { }

  getGene(id: string): Observable<LiteratureModel> {
    return null;
  }

  getLiteratures(page?: number): Observable<LiteratureModel[]> {
    return null;
  }

}
