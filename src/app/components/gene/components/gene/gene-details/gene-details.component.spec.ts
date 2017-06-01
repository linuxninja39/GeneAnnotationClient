import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneDetailsComponent } from './gene-details.component';

describe('GeneDetailsComponent', () => {
  let component: GeneDetailsComponent;
  let fixture: ComponentFixture<GeneDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
