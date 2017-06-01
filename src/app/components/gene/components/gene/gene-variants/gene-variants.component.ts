import {Component, Input, OnInit} from '@angular/core';
import {GeneModel} from "../../../../../models/api/gene.model";

@Component({
  selector: 'app-gene-variants',
  templateUrl: './gene-variants.component.html',
  styleUrls: ['./gene-variants.component.scss']
})
export class GeneVariantsComponent implements OnInit {
  @Input()
  gene: GeneModel;

  constructor() { }

  ngOnInit() {
  }

}
