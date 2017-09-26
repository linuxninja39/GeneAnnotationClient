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
import {CurrentPreviousItemsService} from '../../../../../services/current-previous-items.service';
import {GeneVariantCallHistoryComponent} from '../../../../gene-variant-call-history/gene-variant-call-history.component';
import {GeneVariantFormComponent} from '../../../../gene-variant-form/gene-variant-form.component';
import {VariantTypeDropdownComponent} from '../../../../variant-type-dropdown/variant-type-dropdown.component';
import {VariantTypeService} from '../../../../../services/variant-type.service';

class MockGeneVariantService {
  saveGeneVariant: (geneVariant: GeneVariantModel) => Observable<GeneVariantModel>;
  getGeneVariant: (id: string | number) => Observable<GeneVariantModel>;

}

describe('GeneVariantsComponent', () => {
  let component: GeneVariantsComponent;
  let fixture: ComponentFixture<GeneVariantsComponent>;
  const testGeneIndex = 0;
  const correctColumns = [
    'Zygosity',
    'Variant Type',
    'Call',
    'Start',
    'End',
    'Annotations',
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantsComponent,
        GeneVariantFormComponent,
        VariantTypeDropdownComponent,
        GeneVariantCallHistoryComponent
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
        CookieService,
        VariantTypeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(
    inject([
        AuthService
      ],
      (authService: AuthService) => {

        const currentPreviousItemsService = new CurrentPreviousItemsService();

        Object.defineProperty(authService, 'User', {
          get: function () {
            return <AppUserModel>{id: 1, name: 'joe@joe.com'};
          }
        });
        fixture = TestBed.createComponent(GeneVariantsComponent);
        component = fixture.componentInstance;
        component.gene = JSON.parse(JSON.stringify(TestGenes[testGeneIndex]));
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
      component.showCallHistory(true, TestGeneVariants[0]);
      expect(component.displayCallHistoryDialog).toBeTruthy('showCallHistoryDialog should be true');
      component.showCallHistory(false, TestGeneVariants[0]);
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
        component.selectedVariant = JSON.parse(JSON.stringify(TestGeneVariants[0]));
        component.onRowSelect({});
        const arg = routerSpy.calls.first().args[0];
        expect(arg[0]).toBe('/gene-variant');
        expect(arg[1]).toBe(TestGeneVariants[0].id);
      }
    )
  );

  it(
    'should set dialog visible',
    () => {
      component.showNewVariantDialog();
      expect(component.displayNewVariantDialog).toBeTruthy();
    }
  );

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
    'cell content should be correct',
    () => {
      const bla = [
        'Zygosity',
        'Variant Type',
        'Call',
        'Start',
        'End',
        'Annotations',
      ];

      const dataTableElement = fixture.debugElement.query(By.css('tbody'));
      const children = dataTableElement.children;
      for (let j = 0; j < children.length; j++) {
        const row = children[j];
        const cells = row.children;
        const controlGeneVariant = TestGenes[testGeneIndex].geneVariant[j];
        expect(cells[0].nativeElement.innerText).toContain(controlGeneVariant.zygosityType.name, 'Zygosity cell');
        expect(cells[1].nativeElement.innerText).toContain(controlGeneVariant.variantType.name, 'Variant type cell');
        expect(cells[2].nativeElement.innerText).toContain(controlGeneVariant.currentCallType.callType.name, 'Call cell');
        expect(cells[3].nativeElement.innerText).toContain(controlGeneVariant.start, 'Start cell');
        expect(cells[4].nativeElement.innerText).toContain(controlGeneVariant.end, 'End cell');
      }
    }
  );

  it(
    'should update table after event from GeneVariantFromComponent',
    inject(
      [
        GeneVariantService
      ],
      (geneVariantService) => {

      }
    )
  );

  it(
    'Should call showCallHistory when "Call" cell clicked',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('tbody'));
      const rows = dataTableElement.children;
      const callCell = rows[0].children[2];

      const callDiv = callCell.query(By.css('.callCellEl'));

      const spy = spyOn(component, 'showCallHistory').and.callThrough();

      callDiv.triggerEventHandler('click', null);

      expect(spy.calls.count())
        .toBe(1, 'showCallHistory should have been called once');
      expect(spy.calls.first().args[0]).toBe(true, 'true should have been passed');
    }
  );
});
