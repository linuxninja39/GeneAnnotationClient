import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {GeneVariantsComponent} from './gene-variants.component';
import {DataTableModule, DialogModule, DropdownModule} from 'primeng/primeng';
import {TestGenes} from '../../../../../test-data/test-genes.spec';
import {TruncateModule} from 'ng2-truncate';
import {FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestGeneVariants} from '../../../../../test-data/test-gene-variants.spec';
import {GeneVariantService} from '../../../../../services/gene-variant.service';
import {GeneVariantModel} from '../../../../../models/api/gene-variant.model';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import {AuthService} from '../../../../../services/auth.service';
import {AppUserModel} from '../../../../../models/api/app-user.model';
import {CookieService} from 'ng2-cookies';
import {HttpModule} from '@angular/http';

class MockGeneVariantService {
  saveGeneVariant: (geneVariant: GeneVariantModel) => Observable<GeneVariantModel>;
  getGeneVariant: (id: string | number) => Observable<GeneVariantModel>;

}

describe('GeneVariantsComponent', () => {
  let component: GeneVariantsComponent;
  let fixture: ComponentFixture<GeneVariantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantsComponent
      ],
      imports: [
        HttpModule,
        DataTableModule,
        TruncateModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: GeneVariantService, useClass: MockGeneVariantService},
        AuthService,
        CookieService
      ]
    })
      .compileComponents();
  }));

  beforeEach(
    inject([
        AuthService
      ],
      (authService: AuthService) => {

        Object.defineProperty(authService, 'User', {
          get: function () {
            return <AppUserModel>{id: 1, name: 'joe@joe.com'};
          }
        });
        fixture = TestBed.createComponent(GeneVariantsComponent);
        component = fixture.componentInstance;
        component.gene = JSON.parse(JSON.stringify(TestGenes[0]));
        fixture.detectChanges();
      }
    )
  );


  it(
    'should be created',
    () => {
      expect(component).toBeTruthy();
    }
  );

  it(
    'showCallHistory should set showCallHistoryDialog to argument',
    () => {
      component.showCallHistory(true);
      expect(component.displayCallHistoryDialog).toBeTruthy('showCallHistoryDialog should be true');
      component.showCallHistory(false);
      expect(component.displayCallHistoryDialog).toBeFalsy('showCallHistoryDialog should be false');
    }
  );

  it(
    'showNewVariantDialog should set displayCallHistoryDialog to true',
    () => {
      component.showNewVariantDialog();
      expect(component.displayNewVariantDialog).toBeTruthy('showNewVariantDialog should be true');
    }
  );

  it(
    'should call navigate with correct args',
    inject(
      [Router],
      (router) => {
        const routerSpy = spyOn(router, 'navigate');
        const changeDetectorSpy = spyOn((component as any).changeDetector, 'detectChanges');
        component.selectedVariant = TestGeneVariants[0];
        component.onRowSelect({});
        const arg = routerSpy.calls.first().args[0];
        expect(arg[0]).toBe('/gene-variant');
        expect(arg[1]).toBe(TestGeneVariants[0].id);
      }
    )
  );

  it(
    'should set dialog visible and create new variant',
    () => {
      component.showNewVariantDialog();
      expect(JSON.stringify(component.newVariant))
        .toBe(JSON.stringify({}), 'should be empty object');
      expect(component.displayNewVariantDialog).toBeTruthy();
    }
  );

  it(
    'should call gene-variant.service to save new variant',
    inject(
      [
        GeneVariantService
      ],
      (geneVariantService) => {
        let callCount = 0;
        let correctDataStructure = false;
        component.newVariantForm.patchValue(
          {
            geneId: 1,
            zygosityTypeId: 1,
            variantTypeId: 1
          }
        );
        (<FormArray>component.newVariantForm.get('callType')).controls[0].patchValue(
          {
            callType: {name: 'VOUS'}
          }
        );
        geneVariantService.saveGeneVariant = (geneVariant: GeneVariantModel) => {
          callCount++;
          if (geneVariant.geneId
            && geneVariant.geneId === 1
            && geneVariant.zygosityTypeId
            && geneVariant.zygosityTypeId === 1
            && geneVariant.callType[0].callType
            && geneVariant.callType[0].callType.name === 'VOUS'
            && geneVariant.variantTypeId
            && geneVariant.variantTypeId === 1
          ) {
            correctDataStructure = true;
          }
          return Observable.of(TestGeneVariants[0]);
        };

        component.saveVariant();

        expect(callCount).toBe(1, 'saveGeneVariant not called exactly once');
        expect(correctDataStructure).toBe(true, 'form values not set correctly');

      }
    )
  );

  it(
    'should have correct columns in table',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('thead'));
      const columns = dataTableElement.children[0].children;
      const correctColumns = [
          "Zygosity",
          "Variant Type",
          "Call",
          "Start",
          "End",
          "Annotations",
      ];

      expect(columns.length).toEqual(correctColumns.length, "column count should match");
      for (let i = 0; i < correctColumns.length; i++) {
        expect(columns[i].nativeElement.innerText).toEqual(correctColumns[i]);
      }
    }
  );

  it(
    'html rows should match geneVariants',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('tbody'));
      const children = dataTableElement.children;
      expect(children.length)
        .toBe(TestGeneVariants.length, 'table size and number of variants mismatch');

      const rowCount = 0;
      for (const row of children) {
        expect(row.nativeElement.innerHTML).toContain(TestGeneVariants[rowCount].zygosityType.name);
      }
    }
  );

  it(
    'should update table after saveVariant',
    inject(
      [
        GeneVariantService
      ],
      (geneVariantService) => {
        component.newVariantForm.patchValue(
          {
            geneId: 1,
            zygosityTypeId: 1,
            variantTypeId: 1
          }
        );
        (<FormArray>component.newVariantForm.get('callType')).controls[0].patchValue(
          {
            callType: {name: 'VOUS'}
          }
        );

        const zygosityTypeName = 'Vital Signs';
        geneVariantService.saveGeneVariant = (geneVariant: GeneVariantModel) => {
          return Observable.of(
            TestGeneVariants[0]
          );
        };

        component.saveVariant();

        const dataTableElement = fixture.debugElement.query(By.css('tbody'));
        const children = dataTableElement.children;
        expect(component.gene.geneVariant.length)
          .toBe(TestGeneVariants.length + 1, 'geneVariant should have one more now');
        expect(children[children.length - 1].nativeElement.innerText).toContain(TestGeneVariants[0].zygosityType.name);
      }
    )
  );
});
