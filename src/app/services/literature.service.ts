import { Injectable } from '@angular/core';
import {TestData} from "./test-data";
import {Observable} from "rxjs/Observable";
import {LiteratureModel} from "../models/api/literature.model";
import {observable} from "rxjs/symbol/observable";

@Injectable()
export class LiteratureService {
  private testData = new TestData();
  static readonly YO: string = "yo";

  constructor() { }

  getGene(id: string): Observable<LiteratureModel> {
    return Observable.create(
      (observer) => {
        for (let literature of this.testData.literatures) {
          if (literature.id === id) {
            observer.next(literature);
          }
        }
        observer.complete();
      }
    );
  }


  getLiteratures(page?: number): Observable<LiteratureModel[]> {
    return Observable.create(
      (observable) => {
        observable.next(this.testData.literatures);
        observable.complete();
      }
    );
  }

}
