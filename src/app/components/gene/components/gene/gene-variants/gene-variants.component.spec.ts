import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { GeneVariantsComponent } from './gene-variants.component';
import {DataTableModule, DialogModule, DropdownModule} from 'primeng/primeng';
import {MockPipeResolver} from '@angular/compiler/testing';
import {PipeResolver} from '@angular/compiler';
import {TestGenes} from '../../../../../test-data/test-genes.spec';
import {TruncateModule} from 'ng2-truncate';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestGeneVariants} from '../../../../../test-data/test-gene-variants.spec';
import {GeneService} from '../../../../../services/gene.service';

class MockGeneService {
  getGeneVariant() {}
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
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: GeneService, useClass: MockGeneService }
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
});
