import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {LiteratureComponent} from './literature.component';
import {DataTableModule, DialogModule, EditorModule} from 'primeng/primeng';
import {MdCardModule} from '@angular/material';
import {LiteratureService} from '../../services/literature.service';
import {AnnotationService} from '../../services/annotation.service';
import {HttpModule} from '@angular/http';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LiteratureFormDialogComponent} from '../literature-form-dialog/literature-form-dialog.component';
import {Component, Input} from '@angular/core';
import {TestLiteratures} from '../../test-data/test-literatures';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'app-literature-form-dialog',
  template: ''
})
class MockLiteratureFormDialogComponent {
  @Input()
  display;
}

const correctColumns = [
  'Title',
  'Url',
  'PubMed ID',
  'Abstract',
  'Added On',
  'Added By',
  'Author',
  'Annotations'
];

describe('LiteratureComponent', () => {
  let component: LiteratureComponent;
  let fixture: ComponentFixture<LiteratureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LiteratureComponent,
        MockLiteratureFormDialogComponent
      ],
      imports: [
        ReactiveFormsModule,
        DataTableModule,
        MdCardModule,
        DialogModule,
        HttpModule,
        EditorModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        AnnotationService,
        AuthService,
        CookieService,
        LiteratureService
      ]
    })
      .compileComponents();
  });

  beforeEach(
    inject(
      [LiteratureService],
      (literatureService: LiteratureService) => {
        fixture = TestBed.createComponent(LiteratureComponent);
        spyOn(literatureService, 'getLiteratures')
          .and
          .returnValue(Observable.of(JSON.parse(JSON.stringify(TestLiteratures))));
        component = fixture.componentInstance;
        fixture.detectChanges();
      }
    )
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should have correct columns',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('thead'));
      const headerRowElement = dataTableElement.children[0];
      const columns = headerRowElement.children;

      expect(columns.length).toEqual(correctColumns.length, "column count should match");
      for (let i = 0; i < correctColumns.length; i++) {
        expect(columns[i].nativeElement.innerText).toContain(correctColumns[i]);
      }
    }
  );

  it(
    'should have correct data in columns',
    () => {

      const dataTableElement = fixture.debugElement.query(By.css('tbody'));
      const children = dataTableElement.children;
      for (let j = 0; j < children.length; j++) {
        const row = children[j];
        const cells = row.children;
        const controlLiteratures = TestLiteratures;
        expect(cells[0].nativeElement.innerText).toContain(controlLiteratures[j].title, 'title cell');
        expect(cells[1].nativeElement.innerText).toContain(controlLiteratures[j].url, 'url cell');
        expect(cells[2].nativeElement.innerText).toContain(controlLiteratures[j].pubMedId, 'pubMedId cell');
        expect(cells[3].nativeElement.innerText).toContain(controlLiteratures[j].abstract, 'details/abstract cell');
        expect(cells[6].nativeElement.innerText).toContain(controlLiteratures[j].author[0].name, 'author cell');
      }
    }
  );
});
