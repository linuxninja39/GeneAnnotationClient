import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {By} from "@angular/platform-browser";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`Should have 3 nav elements'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    let de = fixture.debugElement.query(By.css('.navbar-nav'));
    let el = de.nativeElement;
    expect(el.childElementCount).toEqual(3);
  }));

});
