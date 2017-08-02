import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneAnnotationsComponent } from './gene-annotations.component';
import {Component, Input} from '@angular/core';
import {MdCardModule} from '@angular/material';
import {MockDataTableComponent} from '../../../../../test-components/mock-data-table-component.spec';
import {MockColumnComponent} from '../../../../../test-components/mock-column.component.spec';



@Component( { selector: 'p-footer', template: '' } )
class MockFooterComponent {
}

@Component( { selector: 'p-dialog', template: '' } )
class MockDialogComponent {
  @Input()
  visible;
  @Input()
  responsive;
  @Input()
  modal;
  @Input()
  width;
  @Input()
  height;
}

@Component( { selector: 'p-editor', template: '' } )
class MockEditorComponent {
  @Input()
  ngModel;
  @Input()
  style;
}

describe('GeneAnnotationsComponent', () => {
  let component: GeneAnnotationsComponent;
  let fixture: ComponentFixture<GeneAnnotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneAnnotationsComponent,
        MockDataTableComponent,
        MockColumnComponent,
        MockFooterComponent,
        MockDialogComponent,
        MockEditorComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
