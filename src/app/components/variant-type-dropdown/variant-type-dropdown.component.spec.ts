import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantTypeDropdownComponent } from './variant-type-dropdown.component';
import {DropdownModule} from 'primeng/primeng';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('VariantTypeDropdownComponent', () => {
  let component: VariantTypeDropdownComponent;
  let fixture: ComponentFixture<VariantTypeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DropdownModule,
        NoopAnimationsModule
      ],
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
