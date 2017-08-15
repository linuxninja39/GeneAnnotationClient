import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {HttpModule} from '@angular/http';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent],
      imports: [HttpModule],
      providers: [
        AuthService,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.appUser = {name: 'bob', id: 1};
    fixture.detectChanges();
  });

  /*
  it('should be created',
    inject(
      [AuthService],
      (authService) => {
          Object.defineProperty(authService, 'User', {
            get: function() {
              return <AppUserModel>{id: 1, name: 'joe@joe.com'};
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
  */

});
