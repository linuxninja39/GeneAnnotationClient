import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LiteratureModel} from '../models/api/literature.model';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class LiteratureService {
  private readonly BASE_ENDPOINT: string;

  constructor(
    private http: Http
  ) {
    this.BASE_ENDPOINT = environment.apiServerUrl + '/literatures'
  }

  getLiteratures(page?: number): Observable<LiteratureModel[]> {
    return this.http
      .get(this.BASE_ENDPOINT)
      .map((res: Response) => <LiteratureModel[]>res.json())
  }

}
