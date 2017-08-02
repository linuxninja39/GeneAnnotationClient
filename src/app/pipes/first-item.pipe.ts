import { Pipe, PipeTransform } from '@angular/core';
import { Log } from 'ng2-logger';

const log = Log.create('FirstItemPipe');

@Pipe({
  name: 'firstItem'
})
export class FirstItemPipe implements PipeTransform {

  transform(itemList: Array<any>, orderField: string, ascending: boolean = true): any {
    let func;
    // log.info('array is to start', [...itemList]);
    if (ascending) {
      func = (b, a) => {
        // log.info('comparing b to a', b, a);
        if (a[orderField] < b[orderField]) {
          return -1;
        }
        if (a[orderField] > b[orderField]) {
          return 1;
        }
        return 0;
      };
    } else {
       func = (a, b) => {
         // log.info('comparing a to b', a, b);
        if (a[orderField] < b[orderField]) {
          return -1;
        }
        if (a[orderField] > b[orderField]) {
          return 1;
        }
        return 0;
      };
    }

    // log.info('array is now', [...itemList]);

    itemList.sort(func);
    return itemList.pop();
  }

}
