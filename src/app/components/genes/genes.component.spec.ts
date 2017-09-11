import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenesComponent } from './genes.component';
import {DataTableModule, OverlayPanelModule, SharedModule} from 'primeng/primeng';
import {MdProgressSpinnerModule} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {GeneModel} from '../../models/api/gene.model';
import {GeneService} from '../../services/gene.service';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {TestGenes} from '../../test-data/test-genes.spec';
import {HttpModule} from '@angular/http';
import {CurrentPreviousItemsService} from '../../services/current-previous-items.service';

class MockGeneService {
  getGene(id) {
    return Observable.of(<GeneModel>{});
  }

  getGenes() {
    return Observable.of(JSON.parse(JSON.stringify(TestGenes)));
  }
}

describe('GenesComponent', () => {
  let component: GenesComponent;
  let fixture: ComponentFixture<GenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GenesComponent
      ],
      imports: [
        HttpModule,
        DataTableModule,
        SharedModule,
        MdProgressSpinnerModule,
        OverlayPanelModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        GeneService,
        CurrentPreviousItemsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenesComponent);
    component = fixture.componentInstance;
    const geneService = fixture.debugElement.injector.get(GeneService);
    spyOn(geneService, 'getGenes').and.returnValue(Observable.of(JSON.parse(JSON.stringify(TestGenes))));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should have correct columns', () => {
    const dataTableElement = fixture.debugElement.query(By.css('thead'));
    const headerRowElement = dataTableElement.children[0];
    const columns = headerRowElement.children;
    const correctColumns = [
      "Symbols",
      "Chromosome",
      "Start",
      "End",
      "Locus",
      "Origin",
      "Expansion of gene name",
      "Known Function",
    ];
    expect(columns.length).toEqual(correctColumns.length, "column count sould match");
    for (let i = 0; i < correctColumns.length; i++) {
      expect(columns[i].nativeElement.innerText).toEqual(correctColumns[i]);
    }
  });
});
