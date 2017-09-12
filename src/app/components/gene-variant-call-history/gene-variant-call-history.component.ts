import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeneVariantModel} from '../../models/api/gene-variant.model';

@Component({
  selector: 'app-gene-variant-call-history',
  templateUrl: './gene-variant-call-history.component.html',
  styleUrls: ['./gene-variant-call-history.component.scss']
})
export class GeneVariantCallHistoryComponent implements OnInit {
  @Input()
  geneVariant: GeneVariantModel;

  @Input()
  set display(v: boolean) {
    this._display = v;
    this.displayChange.emit(this._display);
  }
  get display(): boolean {
    return this._display;
  }

  @Output()
  displayChange = new EventEmitter<boolean>();

  private _display;

  constructor() { }

  ngOnInit() {
  }

}
