import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityServiceCallbackComponent } from './identity-service-callback.component';

import {NgxOidcClientService} from 'ngx-oidc-client/lib';


class MockNgxOidcClientService {
}


describe('IdentityServiceCallbackComponent', () => {
  let component: IdentityServiceCallbackComponent;
  let fixture: ComponentFixture<IdentityServiceCallbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityServiceCallbackComponent ],
      providers: [
        {
          provide: NgxOidcClientService,
          useClass: MockNgxOidcClientService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityServiceCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
