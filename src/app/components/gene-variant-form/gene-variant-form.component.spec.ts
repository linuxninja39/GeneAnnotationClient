import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {GeneVariantFormComponent} from './gene-variant-form.component';
import {DialogModule, DropdownModule} from 'primeng/primeng';
import {ReactiveFormsModule} from '@angular/forms';
import {VariantTypeDropdownComponent} from '../variant-type-dropdown/variant-type-dropdown.component';
import {AuthService} from '../../services/auth.service';
import {AppUserModel} from '../../models/api/app-user.model';
import {CookieService} from 'ng2-cookies';
import {HttpModule} from '@angular/http';
import {TestGenes} from '../../test-data/test-genes.spec';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GeneVariantService} from '../../services/gene-variant.service';
import {TestGeneVariants} from '../../test-data/test-gene-variants.spec';
import {CurrentPreviousItemsService} from '../../services/current-previous-items.service';
import {Observable} from 'rxjs/Observable';

describe('GeneVariantFormComponent', () => {
  let component: GeneVariantFormComponent;
  let fixture: ComponentFixture<GeneVariantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        DialogModule,
        DropdownModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [
        GeneVariantFormComponent,
        VariantTypeDropdownComponent
      ],
      providers: [
        AuthService,
        CookieService,
        GeneVariantService,
        CurrentPreviousItemsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantFormComponent);
    component = fixture.componentInstance;
    component.gene = JSON.parse(JSON.stringify(TestGenes[0]));
    let authService = getTestBed().get(AuthService);
    Object.defineProperty(authService, 'User', {
      get: function () {
        return <AppUserModel>{id: 1, name: 'joe@joe.com'};
      }
    });
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should have the correct form elements',
    () => {
      expect(component.newVariantForm).toBeTruthy();
      const controlNames = [
        'geneId',
        'zygosityTypeId',
        'variantTypeId',
        'callType',
        'start',
        'end',
      ];

      for (const controlName of controlNames) {
        expect(component.newVariantForm.contains(controlName)).toBeTruthy('does not contain: ' + controlName);
      }
    }
  );

  const eventEmitterName = 'newEventSavedEventEmitter';
  it(
    'should have event emitter "' + eventEmitterName + '"',
    () => {
      expect(component[eventEmitterName]).toBeTruthy('"' + eventEmitterName + '" doesn\'t exist on component');
    }
  );

  it(
    'saveVariant should call geneVariantService.saveGeneVariant and ' + eventEmitterName + '.emit',
    () => {
      const geneVariantService = getTestBed().get(GeneVariantService);
      const geneVariantServiceSpy = spyOn(geneVariantService, 'saveGeneVariant')
        .and.returnValue(Observable.of(JSON.parse(JSON.stringify(TestGeneVariants[0]))));
      const eventEmitterSpy = spyOn(component.newEventSavedEventEmitter, 'emit')
        .and.callThrough();

      component.newVariantForm.patchValue(
        {
          'geneId': TestGeneVariants[0].id,
          'zygosityTypeId': TestGeneVariants[0].zygosityTypeId,
          'variantTypeId': TestGeneVariants[0].variantTypeId,
          'callType': TestGeneVariants[0].callType,
          'start': TestGeneVariants[0].start,
          'end': TestGeneVariants[0].end,
        }
      );

      component.saveVariant();

      expect(geneVariantServiceSpy.calls.count())
        .toEqual(1, 'saveGeneVariant should be called exactly once');
      expect(eventEmitterSpy.calls.count())
        .toEqual(1, 'eventEmitter emit should be called exactly once');
      expect(component.display).toBe(false, 'display should be set to false after save');
    }
  );
});
