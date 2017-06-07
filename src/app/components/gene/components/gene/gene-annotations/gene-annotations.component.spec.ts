import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneAnnotationsComponent } from './gene-annotations.component';

describe('GeneNotesComponent', () => {
  let component: GeneAnnotationsComponent;
  let fixture: ComponentFixture<GeneAnnotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneAnnotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
