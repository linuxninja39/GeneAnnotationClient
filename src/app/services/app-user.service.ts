import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {AppUserModel} from '../models/api/app-user.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppUserService {

  constructor(
    private http: Http
  ) { }

  getAppUser(appUser: AppUserModel): Observable<AppUserModel> {
    return this.http
      .post(
        environment.apiServerUrl + '/AppUsers',
        appUser
      )
      .map((res: Response) => res.json());
  }
}
