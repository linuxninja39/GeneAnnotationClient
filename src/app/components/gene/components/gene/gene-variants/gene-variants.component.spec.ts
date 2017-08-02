import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneVariantsComponent } from './gene-variants.component';
import {DataTableModule} from 'primeng/primeng';
import {MockPipeResolver} from '@angular/compiler/testing';
import {PipeResolver} from '@angular/compiler';

describe('GeneVariantsComponent', () => {
  let component: GeneVariantsComponent;
  let fixture: ComponentFixture<GeneVariantsComponent>;

  /*
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantsComponent
      ],
      imports: [
        DataTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  */
});
