import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantTypeDropdownComponent } from './variant-type-dropdown.component';

describe('VariantTypeDropdownComponent', () => {
  let component: VariantTypeDropdownComponent;
  let fixture: ComponentFixture<VariantTypeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantTypeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
