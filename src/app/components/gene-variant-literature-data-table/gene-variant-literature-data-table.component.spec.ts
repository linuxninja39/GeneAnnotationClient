import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneVariantLiteratureDataTableComponent } from './gene-variant-literature-data-table.component';

describe('GeneVariantLiteratureDataTableComponent', () => {
  let component: GeneVariantLiteratureDataTableComponent;
  let fixture: ComponentFixture<GeneVariantLiteratureDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneVariantLiteratureDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantLiteratureDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
