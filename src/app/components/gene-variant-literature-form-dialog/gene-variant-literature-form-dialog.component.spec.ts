import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {GeneVariantLiteratureFormDialogComponent} from './gene-variant-literature-form-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule, DropdownModule, EditorModule} from 'primeng/primeng';
import {LiteratureService} from '../../services/literature.service';
import {HttpModule} from '@angular/http';
import {GeneVariantLiteratureService} from '../../services/gene-variant-literature.service';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {TestGeneVariants} from '../../test-data/test-gene-variants.spec';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Observable} from 'rxjs/Observable';
import {TestLiteratures} from '../../test-data/test-literatures';
import {AppUserModel} from '../../models/api/app-user.model';

describe('GeneVariantLiteratureFormDialogComponent', () => {
  let component: GeneVariantLiteratureFormDialogComponent;
  let fixture: ComponentFixture<GeneVariantLiteratureFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneVariantLiteratureFormDialogComponent],
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

  beforeEach(
    inject([
      LiteratureService,
      AuthService
      ],
      (literatureService: LiteratureService, authService: AuthService) => {
        fixture = TestBed.createComponent(GeneVariantLiteratureFormDialogComponent);
        spyOn(literatureService, 'getLiteratures').and.returnValue(Observable.of(TestLiteratures));

        Object.defineProperty(authService, 'User', {
          get: function () {
              return <AppUserModel>{id: 1, name: 'joe@joe.com'};
            }
          });

        component = fixture.componentInstance;
        component.geneVariant = JSON.parse(JSON.stringify(TestGeneVariants[0]));
        component.display = false;
        fixture.detectChanges();
      }
    )
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
