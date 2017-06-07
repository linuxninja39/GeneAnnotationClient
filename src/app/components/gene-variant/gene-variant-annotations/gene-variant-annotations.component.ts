import {Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from "../../../models/api/gene-variant.model";

@Component({
  selector: 'app-gene-variant-annotations',
  templateUrl: './gene-variant-annotations.component.html',
  styleUrls: ['./gene-variant-annotations.component.scss']
})
export class GeneVariantAnnotationsComponent implements OnInit {
  @Input()
  geneVariant = <GeneVariantModel>null;

  constructor() { }

  ngOnInit() {
  }

}
