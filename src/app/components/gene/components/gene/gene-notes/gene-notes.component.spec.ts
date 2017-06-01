import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneNotesComponent } from './gene-notes.component';

describe('GeneNotesComponent', () => {
  let component: GeneNotesComponent;
  let fixture: ComponentFixture<GeneNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
