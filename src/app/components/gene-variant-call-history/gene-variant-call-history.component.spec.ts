import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneVariantCallHistoryComponent} from './gene-variant-call-history.component';
import {By} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {DataTableModule, DialogModule} from 'primeng/primeng';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PathogenicSupportCategory} from 'app/models/api/pathogenic-support-category.model';

const TestAppUser = {
  id: 1,
  name: 'b@b.com'
};

const TestGeneVariant = {
  id: 1,
  geneId: 1,
  zygosityType: {id: 1, name: 'zy'},
  variantType: {id: 1, name: 'varT'},
  currentCallType: {
    id: 2,
    geneVariantId: 1,
    callTypeId: 2,
    callType: {name: 'VOUS'},
    activeDate: new Date(),
    createdBy: {
      id: 1,
      name: 'b@b.com'
    }
  },
  callType: [
    {
      id: 1,
      geneVariantId: 1,
      callTypeId: 1,
      callType: {
        name: 'VOUS'
      },
      activeDate: new Date(),
      createdBy: {
        id: 1,
        name: 'b@b.com'
      }
    }
  ],
  start: 44434,
  end: 54334,
  annotation: [
    {
      id: 1,
      note: 'yo',
      createdAt: new Date(),
      appUser: {id: 1, name: 'jacob'}
    }
  ],
  geneVariantLiterature: [
    {
      geneVariantId: 1,
      literature: {
        title: 'my lit title',
        url: 'http://liturl',
        pubMedId: '1',
        details: 'um, cool details. How many times',
        author: []
      },
      pathogenicSupportCategory: {name: PathogenicSupportCategory.Supportive},
      appUser: {id: 1, name: 'j@j.com'},
      addedAt: new Date()
    }
  ]
};

describe('GeneVariantCallHistoryComponent', () => {
  let component: GeneVariantCallHistoryComponent;
  let fixture: ComponentFixture<GeneVariantCallHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneVariantCallHistoryComponent],
      imports: [DialogModule, DataTableModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantCallHistoryComponent);
    component = fixture.componentInstance;
    component.geneVariant = JSON.parse(JSON.stringify(TestGeneVariant));
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

      const datePipe = new DatePipe('en-US');
      for (let i = 0; i < callTypes.length; i++) {
        const dateString = datePipe.transform(callTypes[i].activeDate, 'medium');
        const cells = rows[i].children;
        expect(cells[0].nativeElement.innerText)
          .toContain(callTypes[i].callType.name, 'cell should match callType.name');
        expect(cells[1].nativeElement.innerText)
          .toContain(dateString, 'cell should match stringified activeDate');
        expect(cells[2].nativeElement.innerText)
          .toContain(callTypes[i].createdBy.name, 'cell should match createdBy.name');
      }
    }
  );

  it(
    'Should have a table with the correct column count and headers',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('thead'));
      const columns = dataTableElement.children[0].children;
      const correctColumns = [
        'Call',
        'Added On',
        'Added By',
      ];

      expect(columns.length).toEqual(correctColumns.length, 'column count should match');
      for (let i = 0; i < correctColumns.length; i++) {
        expect(columns[i].nativeElement.innerText).toContain(correctColumns[i]);
      }
    }
  );
});
