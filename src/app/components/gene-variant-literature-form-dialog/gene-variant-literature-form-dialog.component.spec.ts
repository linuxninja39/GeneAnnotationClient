import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneVariantLiteratureFormDialogComponent } from './gene-variant-literature-form-dialog.component';

describe('GeneVariantLiteratureFormDialogComponent', () => {
  let component: GeneVariantLiteratureFormDialogComponent;
  let fixture: ComponentFixture<GeneVariantLiteratureFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneVariantLiteratureFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantLiteratureFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
