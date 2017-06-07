import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GeneModel} from "../../../../../models/api/gene.model";
import { Log } from 'ng2-logger';
import {Router} from "@angular/router";
import {SelectItem} from "primeng/primeng";
import {GeneVariantModel} from "../../../../../models/api/gene-variant.model";
import {GeneVariantZygosityType} from "../../../../../models/api/types/gene-variant-zygosity.type";
import {GeneVariantType} from "../../../../../models/api/types/gene-variant.type";
import {GeneVariantCallType} from "../../../../../models/api/types/gene-variant-call.type";

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
  zygosities: SelectItem[] = [];
  types: SelectItem[] = [];
  calls: SelectItem[] = [];
  selectedVariant: GeneVariantModel;

  constructor(private router: Router, private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.setupDropdownOptions();
  }

  private setupDropdownOptions() {
    let types = {
      zygosities: GeneVariantZygosityType,
      types: GeneVariantType,
      calls: GeneVariantCallType
    };
    for (let type in types) {
      let count = 0;
      for (let z in types[type]) {
        if (count % 2 != 0) {
          this[type].push({label: z, value: z});
        }
        count++;
      }
    }
  }

  showNewVariantDialog() {
    this.newVariant = <GeneVariantModel>{};
    this.displayNewVariantDialog = true;
  }

  onRowSelect(event) {
    this.router.navigate(['/gene-variant', this.selectedVariant.id]);
  }

  saveVariant() {
    this.gene.variants = [...this.gene.variants, this.newVariant];
    this.displayNewVariantDialog = false;
    this.changeDetector.detectChanges();
  }
}
