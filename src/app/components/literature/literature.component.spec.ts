import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteratureComponent } from './literature.component';
import {DataTableModule, DialogModule, EditorModule} from 'primeng/primeng';
import {MdCardModule} from '@angular/material';
import {LiteratureService} from '../../services/literature.service';
import {AnnotationService} from '../../services/annotation.service';
import {HttpModule} from '@angular/http';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LiteratureComponent', () => {
  let component: LiteratureComponent;
  let fixture: ComponentFixture<LiteratureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LiteratureComponent
      ],
      imports: [
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

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
