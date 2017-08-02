import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneVariantComponent } from './gene-variant.component';
import {AccordionModule, DataTableModule, DialogModule, EditorModule} from 'primeng/primeng';
import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {GeneService} from '../../services/gene.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GeneVariantModel} from '../../models/api/gene-variant.model';

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

class MockGeneService {
  getGeneVariant() {
    return Observable.of(<GeneVariantModel>{});
  }
}

describe('GeneVariantComponent', () => {
  let component: GeneVariantComponent;
  let fixture: ComponentFixture<GeneVariantComponent>;
  const geneService = new MockGeneService();
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantComponent,
        MockGeneVariantAnnotationsComponent,
        MockGeneVariantLiteratureDataTableComponent
      ],
      imports: [
        AccordionModule,
        DataTableModule,
        DialogModule,
        EditorModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: 123})
          }
        },
        {
          provide: GeneService,
          useValue: geneService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
