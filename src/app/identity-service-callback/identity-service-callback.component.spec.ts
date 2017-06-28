import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityServiceCallbackComponent } from './identity-service-callback.component';

describe('IdentityServiceCallbackComponent', () => {
  let component: IdentityServiceCallbackComponent;
  let fixture: ComponentFixture<IdentityServiceCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityServiceCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityServiceCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
