import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneVariantLiteratureDataTableComponent } from './gene-variant-literature-data-table.component';
import {DataTableModule, DialogModule, ListboxModule} from 'primeng/primeng';
import {TruncateWordsPipe} from 'ng2-truncate/dist/truncate-words.pipe';
import {MdCardModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {EditorModule} from 'primeng/components/editor/editor';
import {LiteratureService} from '../../services/literature.service';
import {HttpModule} from '@angular/http';
import {AnnotationService} from '../../services/annotation.service';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('GeneVariantLiteratureDataTableComponent', () => {
  let component: GeneVariantLiteratureDataTableComponent;
  let fixture: ComponentFixture<GeneVariantLiteratureDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantLiteratureDataTableComponent,
        TruncateWordsPipe
      ],
      imports: [
        DataTableModule,
        MdCardModule,
        DialogModule,
        FormsModule,
        EditorModule,
        ListboxModule,
        HttpModule,
        NoopAnimationsModule
      ],
      providers: [
        LiteratureService,
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
    fixture.detectChanges();
  });

  it('should be created', () => {
     expect(component).toBeTruthy();
  });
});
