import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoAreYouComponent } from './who-are-you.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ng2-cookies';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('WhoAreYouComponent', () => {
  let component: WhoAreYouComponent;
  let fixture: ComponentFixture<WhoAreYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoAreYouComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [CookieService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoAreYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
