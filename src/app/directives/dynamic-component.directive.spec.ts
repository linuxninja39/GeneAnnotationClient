import { DynamicComponentDirective } from './dynamic-component.directive';
import {async, TestBed} from '@angular/core/testing';
import {ViewContainerRef} from '@angular/core';

describe('DynamicComponentDirective', () => {
    beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [ViewContainerRef]
    })
    .compileComponents();
  }));


  it('should create an instance', () => {
    const ref = TestBed.get(ViewContainerRef);
    const directive = new DynamicComponentDirective(ref);
    expect(directive).toBeTruthy();
  });
});
