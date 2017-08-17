import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';

export class FrontEndOnlyServiceUtil {
  static frontEndReturn<T>(testReturnObj: T, prodReturnObservable: Observable<T>): Observable<T> {
    if (environment.frontendOnly) {
      return Observable.of(JSON.parse(JSON.stringify(testReturnObj)));
    }
    return prodReturnObservable;
  }
}
