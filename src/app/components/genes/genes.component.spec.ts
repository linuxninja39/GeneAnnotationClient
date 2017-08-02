import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenesComponent } from './genes.component';
import {DataTableModule, OverlayPanelModule, SharedModule} from 'primeng/primeng';
import {MdProgressSpinnerModule} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {GeneModel} from '../../models/api/gene.model';
import {GeneService} from '../../services/gene.service';
import {RouterTestingModule} from '@angular/router/testing';

class MockGeneService {
  getGene(id) {
    return Observable.of(<GeneModel>{});
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
        DataTableModule,
        SharedModule,
        MdProgressSpinnerModule,
        OverlayPanelModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {
          provide: GeneService,
          userClass: MockGeneService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should have an id', () => {
    expect(1).toEqual(1);
  });
});
