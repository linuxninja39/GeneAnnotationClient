import { FirstItemPipe } from './first-item.pipe';
import { Log } from 'ng2-logger';

const log = Log.create('FirstItemPipe.spec');

describe('FirstItemPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstItemPipe();
    expect(pipe).toBeTruthy();
  });

  it('get first item', () => {
    const pipe = new FirstItemPipe();
    const earlier = new Date();
    earlier.setDate(earlier.getDate() - 1);
    const thing2 = {
      thing: 'thing2',
      date: earlier,
      num: 2
    };
    const thing1 = {
      thing: 'thing1',
      date: new Date(),
      num: 1
    };
    let items = [thing1, thing2];

    items.sort(
      (a, b) => {
        log.info('in spec comparing a to b', a, b);
        const field = 'date';
        if (a[field] > b[field]) {
          return -1;
        }
        if (a[field] < b[field]) {
          return 1;
        }
        return 0;
      }
    );

    log.info('items now', [...items]);

    expect(pipe.transform(items, 'date', false))
      .toBe(thing1, 'should get the right object with date descending');

    items = [thing2, thing1];
    expect(pipe.transform(items, 'thing'))
      .toBe(thing1, 'should get thing 1');

    items = [thing2, thing1];
    expect(pipe.transform(items, 'num', false))
      .toBe(thing2, 'should get thing2');
  });
});
