import {Component, Input} from '@angular/core';

@Component({selector: 'p-editor', template: '' } )
export class MockEditorComponent {
  @Input()
  value;
  @Input()
  selection;
  @Input()
  ngModel;
}
