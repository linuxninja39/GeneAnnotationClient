import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneComponent } from './gene.component';
import {AccordionModule} from 'primeng/primeng';
import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {GeneService} from '../../services/gene.service';
import {Http} from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GeneModel} from '../../models/api/gene.model';
import {MdProgressSpinnerModule} from '@angular/material';

@Component( { selector: 'app-gene-details', template: '' } )
class MockGeneDetailsComponent {
  @Input()
  gene;
}

@Component( { selector: 'app-gene-variants', template: '' } )
class MockGeneVariantsComponent {
  @Input()
  gene;
}

@Component( { selector: 'app-gene-notes', template: '' } )
class MockGeneAnnotationsComponent {
  @Input()
  gene;
}

class MockGeneService {
  getGene(id) {
    return Observable.of(<GeneModel>{});
  }
}

describe('GeneComponent', () => {
  let component: GeneComponent;
  let fixture: ComponentFixture<GeneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneComponent,
        MockGeneDetailsComponent,
        MockGeneVariantsComponent,
        MockGeneAnnotationsComponent
      ],
      imports: [
        AccordionModule,
        NoopAnimationsModule,
        MdProgressSpinnerModule
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
          useClass: MockGeneService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
