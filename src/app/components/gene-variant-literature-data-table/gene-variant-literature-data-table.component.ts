import {Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from "../../models/api/gene-variant.model";

@Component({
  selector: 'app-gene-variant-literature-data-table',
  templateUrl: './gene-variant-literature-data-table.component.html',
  styleUrls: ['./gene-variant-literature-data-table.component.scss']
})
export class GeneVariantLiteratureDataTableComponent implements OnInit {
  @Input()
  geneVariant: GeneVariantModel;

  constructor() { }

  ngOnInit() {
  }

}
