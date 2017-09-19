import { DynamicComponentDirective } from './dynamic-component.directive';
import {TestBed} from '@angular/core/testing';
import {ViewContainerRef} from '@angular/core';

describe('DynamicComponentDirective', () => {
  it('should create an instance', () => {
    const ref = TestBed.get(ViewContainerRef);
    const directive = new DynamicComponentDirective(ref);
    expect(directive).toBeTruthy();
  });
});
