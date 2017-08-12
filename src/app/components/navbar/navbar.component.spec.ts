import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {By} from '@angular/platform-browser';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {AppUserModel} from '../../models/api/app-user.model';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent],
      providers: [
        /*
        {
          provide: AuthService,
          userClass: MockAuthService
        }
        */
        AuthService,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // component.appUser = {name: 'bob', id: 1};
    fixture.detectChanges();
  });

  it('should be created',
    inject(
      [AuthService],
      (authService) => {
          Object.defineProperty(authService, 'User', {
            get: function() {
              return <AppUserModel>{name: 'joe'};
            }
          });
        expect(component).toBeTruthy();
      }
    )
  );

  it(`Should have 2 nav elements'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    const de = fixture.debugElement.query(By.css('.navbar-nav'));
    const el = de.nativeElement;
    expect(el.childElementCount).toEqual(2);
  }));

});
