import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneVariantComponent } from './gene-variant.component';
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
        GeneVariantService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantComponent);
    geneVariantService = fixture.debugElement.injector.get(GeneVariantService);
    geneVariantServiceSpy = spyOn(geneVariantService, 'getGeneVariant')
      .and.returnValue(Observable.of(<GeneVariantModel>{}));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
