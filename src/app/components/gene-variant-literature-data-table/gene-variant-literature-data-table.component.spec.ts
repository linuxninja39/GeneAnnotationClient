import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneVariantLiteratureDataTableComponent} from './gene-variant-literature-data-table.component';
import {DataTableModule, DialogModule, DropdownModule, ListboxModule} from 'primeng/primeng';
import {TruncateWordsPipe} from 'ng2-truncate/dist/truncate-words.pipe';
import {MdCardModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorModule} from 'primeng/components/editor/editor';
import {LiteratureService} from '../../services/literature.service';
import {HttpModule} from '@angular/http';
import {AnnotationService} from '../../services/annotation.service';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  GeneVariantLiteratureFormDialogComponent
} from '../gene-variant-literature-form-dialog/gene-variant-literature-form-dialog.component';
import {GeneVariantLiteratureService} from '../../services/gene-variant-literature.service';
import {TestGeneVariants} from '../../test-data/test-gene-variants.spec';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-gene-variant-literature-form-dialog',
  template: ''
})
class TestFormDialogComponent {
  @Input()
  display;
  @Input()
  geneVariant;
}

describe('GeneVariantLiteratureDataTableComponent', () => {
  let component: GeneVariantLiteratureDataTableComponent;
  let fixture: ComponentFixture<GeneVariantLiteratureDataTableComponent>;
  let literatureService: LiteratureService;

  const testGeneVariantIndex = 0;
  const correctColumns = [
    'Title',
    'Url',
    'PubMed ID',
    'Abstract',
    'Added On',
    'Added By',
    'Pathogenic Support Category',
    'Annotations',
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantLiteratureDataTableComponent,
        TestFormDialogComponent,
        TruncateWordsPipe
      ],
      imports: [
        DataTableModule,
        MdCardModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        ListboxModule,
        HttpModule,
        NoopAnimationsModule,
        DropdownModule
      ],
      providers: [
        AnnotationService,
        AuthService,
        CookieService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantLiteratureDataTableComponent);
    component = fixture.componentInstance;
    component.geneVariant = JSON.parse(JSON.stringify(TestGeneVariants[testGeneVariantIndex]));
    // literatureService = fixture.debugElement.injector.get(LiteratureService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should have correct columns in table',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('thead'));
      const columns = dataTableElement.children[0].children;

      expect(columns.length).toEqual(correctColumns.length, 'column count should match');
      for (let i = 0; i < correctColumns.length; i++) {
        expect(columns[i].nativeElement.innerText).toEqual(correctColumns[i]);
      }
    }
  );

  it(
    'html rows and cells should match geneVariant.geneVariantLiterature',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('tbody'));
      const rows = dataTableElement.children;
      const geneVariantLiteratures = TestGeneVariants[testGeneVariantIndex].geneVariantLiterature;
      expect(rows.length)
        .toBe(geneVariantLiteratures.length, 'table size and number of variantLiteratures mismatch');

      /*
      [
    'Title',
    'Url',
    'PubMed ID',
    'Abstract',
    'Added On',
    'Added By',
    'Pathogenic Support Category',
    'Annotations',
  ];
       */

      const datePipe = new DatePipe('en-US');

      const rowCount = 0;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.children;
        const addedOnString = datePipe.transform(geneVariantLiteratures[i].addedAt, 'medium');

        expect(cells[0].nativeElement.innerText).toContain(geneVariantLiteratures[i].literature.title);
        expect(cells[1].nativeElement.innerText).toContain(geneVariantLiteratures[i].literature.url);
        expect(cells[2].nativeElement.innerText).toContain(geneVariantLiteratures[i].literature.pubMedId);
        expect(cells[3].nativeElement.innerText).toContain(geneVariantLiteratures[i].literature.details);
        expect(cells[4].nativeElement.innerText).toContain(addedOnString);
        expect(cells[5].nativeElement.innerText).toContain(geneVariantLiteratures[i].appUser.name);
        expect(cells[6].nativeElement.innerText).toContain(geneVariantLiteratures[i].pathogenicSupportCategory.name);
      }
    }
  );
});
