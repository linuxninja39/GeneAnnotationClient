import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneVariantLiteratureDataTableComponent } from './gene-variant-literature-data-table.component';
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

describe('GeneVariantLiteratureDataTableComponent', () => {
  let component: GeneVariantLiteratureDataTableComponent;
  let fixture: ComponentFixture<GeneVariantLiteratureDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantLiteratureDataTableComponent,
        GeneVariantLiteratureFormDialogComponent,
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
        LiteratureService,
        AnnotationService,
        AuthService,
        CookieService,
        GeneVariantLiteratureService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantLiteratureDataTableComponent);
    component = fixture.componentInstance;
    component.geneVariant = JSON.parse(JSON.stringify(TestGeneVariants[0]));
    fixture.detectChanges();
  });

  it('should be created', () => {
     expect(component).toBeTruthy();
  });
});
