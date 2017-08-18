import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LiteratureFormDialogComponent} from './literature-form-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule, DropdownModule, EditorModule} from 'primeng/primeng';
import {HttpModule} from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LiteratureService} from '../../services/literature.service';
import {GeneVariantLiteratureService} from '../../services/gene-variant-literature.service';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ng2-cookies';

describe('LiteratureFormDialogComponent', () => {
  let component: LiteratureFormDialogComponent;
  let fixture: ComponentFixture<LiteratureFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiteratureFormDialogComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        HttpModule,
        NoopAnimationsModule
      ],
      providers: [
        LiteratureService,
        GeneVariantLiteratureService,
        AuthService,
        CookieService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteratureFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
