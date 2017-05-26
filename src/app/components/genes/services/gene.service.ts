import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {GeneModel} from "../../../models/api/gene.model";
import {Observable} from "rxjs/Observable";
import { Log } from 'ng2-logger';

const log = Log.create('GeneService');

@Injectable()
export class GeneService {
  constructor(private http: Http) { }

  getGenes(page?: number): Observable<GeneModel[]> {
    const genes = [
      {
        id: '1',
        symbol: 'A1BG',
        geneNameExpansion: 'alpha-1-B glycoprotein'
      },
      {
        id: '2',
        symbol: 'A1BG-AS1',
        geneNameExpansion: 'A1BG antisense RNA 1'
      },
       {
        id: '3',
        symbol: 'A1CF',
        geneNameExpansion: 'APOBEC1 complementation factor'
      }
    ];
    return Observable
      .create(
        (observer) => {
          observer.next(genes);
          observer.complete();
        }
      );
  }
}
