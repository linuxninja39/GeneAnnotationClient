import {Component, Input} from '@angular/core';

@Component({selector: 'p-dataTable', template: '' } )
export class MockDataTableComponent {
  @Input()
  value;
  @Input()
  selection;
}

