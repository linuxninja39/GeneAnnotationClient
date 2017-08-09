import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { GeneVariantsComponent } from './gene-variants.component';
import {DataTableModule, DialogModule, DropdownModule} from 'primeng/primeng';
import {MockPipeResolver} from '@angular/compiler/testing';
import {PipeResolver} from '@angular/compiler';
import {TestGenes} from '../../../../../test-data/test-genes.spec';
import {TruncateModule} from 'ng2-truncate';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestGeneVariants} from '../../../../../test-data/test-gene-variants.spec';
import {GeneVariantService} from '../../../../../services/gene-variant.service';
import {GeneVariantModel} from '../../../../../models/api/gene-variant.model';
import {Observable} from "rxjs/Observable";

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
        { provide: GeneVariantService, useClass: MockGeneVariantService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantsComponent);
    component = fixture.componentInstance;
    component.gene = TestGenes[0];
    fixture.detectChanges();
  });


  it(
    'should be created',
    () => {
      expect(component).toBeTruthy();
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

  it (
    'should set dialog visible and create new variant',
    () => {
      component.showNewVariantDialog();
      expect(JSON.stringify(component.newVariant))
        .toBe(JSON.stringify({}), 'should be empty object');
      expect(component.displayNewVariantDialog).toBeTruthy();
    }
  );

  it (
    'should call gene-variant.service to save new variant',
    inject(
      [
        GeneVariantService
      ],
      (geneVariantService) => {
        let callCount = 0;
        let correctDataStructure = false;
        component.newVariantForm.setValue(
          {
            geneId: 1,
            zygosityTypeId: 1,
            callTypeId: 1,
            variantTypeId: 1
          }
        );
        geneVariantService.saveGeneVariant = (geneVariant: GeneVariantModel) => {
          callCount++;
          if (geneVariant.geneId
            && geneVariant.geneId === 1
            && geneVariant.zygosityTypeId
            && geneVariant.zygosityTypeId === 1
            && geneVariant.callTypeId
            && geneVariant.callTypeId === 1
            && geneVariant.variantTypeId
            && geneVariant.variantTypeId === 1
          ) {
            correctDataStructure = true;
          }
          return Observable.of(TestGeneVariants[0]);
        };

        component.saveVariant();

        expect(callCount).toBe(1, 'saveGeneVariant not called exactly once');
        expect(correctDataStructure).toBe(true,'form values not set correctly');

      }
    )
  );
});
