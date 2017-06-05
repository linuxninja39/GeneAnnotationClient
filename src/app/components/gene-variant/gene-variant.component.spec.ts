import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneVariantComponent } from './gene-variant.component';

describe('GeneVariantComponent', () => {
  let component: GeneVariantComponent;
  let fixture: ComponentFixture<GeneVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
