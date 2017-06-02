import {Component, Input, OnInit} from '@angular/core';
import {GeneModel} from "../../../../../models/api/gene.model";
import {GeneVariantModel, GeneVariantZygosityType} from "../../../../../models/api/gene-variant.model";
import { Log } from 'ng2-logger';

const log = Log.create('GeneVariantsComponent');

@Component({
  selector: 'app-gene-variants',
  templateUrl: './gene-variants.component.html',
  styleUrls: ['./gene-variants.component.scss']
})
export class GeneVariantsComponent implements OnInit {
  @Input()
  gene: GeneModel;
  displayNewVariantDialog: boolean = false;
  newVariant: GeneVariantModel;
  zygosities: string[] = [];

  constructor() { }

  ngOnInit() {
    let count = 0;
    for (let z in GeneVariantZygosityType) {
      log.info('type: ', z);
      if (count % 2 == 0) {
        this.zygosities.push(z);
      }
      count++;
    }
  }

  showNewVariantDialog() {
    this.newVariant = <GeneVariantModel>{};
    this.displayNewVariantDialog = true;
  }
}
