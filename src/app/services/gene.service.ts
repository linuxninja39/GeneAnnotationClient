import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {GeneModel} from "../models/api/gene.model";
import {Observable} from "rxjs/Observable";
import { Log } from 'ng2-logger';
import {ChromosomeModel} from "../models/api/chromosome.model";
import {HumanGenomeModel} from "../models/api/human-genome.model";
import {TestData} from "./test-data";
import {observable} from "rxjs/symbol/observable";

const log = Log.create('GeneService');

@Injectable()
export class GeneService {
  private testData: TestData = new TestData();
  private genes: GeneModel[];

  constructor(private http: Http) {
    this.genes = this.testData.genes;
  }

  getGene(id: string): Observable<GeneModel> {
      return Observable.create(
        (observer) => {
          for (let gene of this.genes) {
            if (gene.id === id) {
              observer.next(gene);
            }
          }
          observer.complete();
        }
      );
  }

  getGenes(page?: number): Observable<GeneModel[]> {
    return Observable.create(
      (observable) => {
        observable.next(this.genes);
        observable.complete();
      }
    );
  }

}
