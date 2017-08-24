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

@Component({
  selector: 'app-literature-form-dialog',
  template: ''
})
class MockLiteratureFormDialogComponent {
  @Input()
  display;
}

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
        spyOn(literatureService, 'getLiteratures').and.returnValue(Observable.of(TestLiteratures));
        component = fixture.componentInstance;
        fixture.detectChanges();
      }
    )
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
