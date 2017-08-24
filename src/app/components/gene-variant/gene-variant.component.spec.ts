import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GeneVariantComponent} from './gene-variant.component';
import {AccordionModule, DataTableModule, DialogModule, EditorModule} from 'primeng/primeng';
import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GeneVariantModel} from '../../models/api/gene-variant.model';
import {GeneVariantService} from '../../services/gene-variant.service';
import {MockBackend} from '@angular/http/testing';
import {HttpModule} from '@angular/http';
import {TestGeneVariants} from '../../test-data/test-gene-variants.spec';
import {TestGenes} from '../../test-data/test-genes.spec';
import {By} from '@angular/platform-browser';
import {GeneService} from '../../services/gene.service';
import {CurrentPreviousItemsService} from '../../services/current-previous-items.service';

@Component(
  {
    selector: 'app-gene-variant-literature-data-table',
    template: ''
  }
)
class MockGeneVariantLiteratureDataTableComponent {
  @Input()
  geneVariant;
}

@Component(
  {
    selector: 'app-gene-variant-annotations',
    template: ''
  }
)
class MockGeneVariantAnnotationsComponent {
  @Input()
  geneVariant;
}

describe('GeneVariantComponent', () => {
  let component: GeneVariantComponent;
  let fixture: ComponentFixture<GeneVariantComponent>;
  let geneVariantService: GeneVariantService;
  let geneVariantServiceSpy: jasmine.Spy;
  let geneService: GeneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantComponent,
        MockGeneVariantAnnotationsComponent,
        MockGeneVariantLiteratureDataTableComponent
      ],
      imports: [
        HttpModule,
        AccordionModule,
        DataTableModule,
        DialogModule,
        EditorModule,
        NoopAnimationsModule
      ],
      providers: [
        MockBackend,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: 123})
          }
        },
        GeneVariantService,
        GeneService,
        CurrentPreviousItemsService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantComponent);
    geneVariantService = fixture.debugElement.injector.get(GeneVariantService);
    geneVariantServiceSpy = spyOn(geneVariantService, 'getGeneVariant')
      .and.returnValue(Observable.of(TestGeneVariants[0]));
    geneService = fixture.debugElement.injector.get(GeneService);
    geneVariantServiceSpy = spyOn(geneService, 'getGene')
      .and.returnValue(Observable.of(TestGenes[0]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should have the correct values',
    () => {
      component.geneVariant = JSON.parse(JSON.stringify(TestGeneVariants[0]));
      component.gene = JSON.parse(JSON.stringify(TestGenes[0]));
      fixture.detectChanges();

      const geneNameEl = fixture.debugElement.query(By.css('.geneNameEl'));
      expect(geneNameEl.nativeElement.innerText).toContain(TestGenes[0].currentGeneName.name);

      const zygosityTypeNameEl = fixture.debugElement.query(By.css('.zygosityTypeNameEl'));
      expect(zygosityTypeNameEl.nativeElement.innerText).toContain(TestGeneVariants[0].zygosityType.name);

      const variantTypeNameEl = fixture.debugElement.query(By.css('.variantTypeNameEl'));
      expect(variantTypeNameEl.nativeElement.innerText).toContain(TestGeneVariants[0].variantType.name);

      const callTypeNameEl = fixture.debugElement.query(By.css('.callTypeNameEl'));
      expect(callTypeNameEl.nativeElement.innerText).toContain(TestGeneVariants[0].currentCallType.callType.name);
    }
  );
});
