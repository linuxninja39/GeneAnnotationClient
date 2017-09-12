import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneVariantCallHistoryComponent} from './gene-variant-call-history.component';
import {TestGeneVariants} from '../../test-data/test-gene-variants.spec';
import {By} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {LOCALE_ID} from '@angular/core';

describe('GeneVariantCallHistoryComponent', () => {
  let component: GeneVariantCallHistoryComponent;
  let fixture: ComponentFixture<GeneVariantCallHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneVariantCallHistoryComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantCallHistoryComponent);
    component = fixture.componentInstance;
    component.geneVariant = JSON.parse(JSON.stringify(TestGeneVariants[0]));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'setting display should emit event',
    () => {
      let displayChange: boolean;
      component.displayChange.subscribe(
        (change: boolean) => {
          displayChange = change;
        }
      );

      component.display = true;
      expect(displayChange).toBe(true, 'event should have been emitted with true value');

      component.display = false;
      expect(displayChange).toBe(false, 'event should have been emitted with false value');
    }
  );

  it(
    'Should have a table with the correct values in cells',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('tbody'));
      const rows = dataTableElement.children;
      const callTypes = component.geneVariant.callType;

      expect(rows.length).toBe(
        callTypes.length,
        'should be same number of rows as calls in geneVariant'
      );

      const datePipe = new DatePipe(LOCALE_ID.toString());
      for (let i = 0; i < callTypes.length; i++) {
        const dateString = datePipe.transform(callTypes[i].activeDate, 'medium');
        const cells = rows[i].children;
        expect(cells[0]).toBe(callTypes[i].callType.name, 'cell should match callType.name');
        expect(cells[1]).toBe(dateString, 'cell should match stringified activeDate');
        expect(cells[0]).toBe(callTypes[i].createdBy.name, 'cell should match createdBy.name');
      }
    }
  );

  it(
    'Should have a table with the correct column count and headers',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('table'));
      const columns = dataTableElement.children[0].children;
      const correctColumns = [
        'Call',
        'Added On',
        'Added By',
      ];

      expect(columns.length).toEqual(correctColumns.length, 'column count should match');
      for (let i = 0; i < correctColumns.length; i++) {
        expect(columns[i].nativeElement.innerText).toEqual(correctColumns[i]);
      }
    }
  );
});
