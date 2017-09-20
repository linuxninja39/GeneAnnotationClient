import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-variant-type-dropdown',
  templateUrl: './variant-type-dropdown.component.html',
  styleUrls: ['./variant-type-dropdown.component.scss']
})
export class VariantTypeDropdownComponent implements OnInit {
  @Input()
  variantTypes;

  constructor() { }

  ngOnInit() {
  }

  valueChange(event) {
    console.log('event', event);
    console.log('value', event.value);

  }
}
