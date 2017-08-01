import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GeneModel} from '../../../../../models/api/gene.model';
import { Log } from 'ng2-logger';
import {Router} from '@angular/router';
import {SelectItem} from 'primeng/primeng';
import {GeneVariantModel} from '../../../../../models/api/gene-variant.model';
import {ZygosityTypeModel} from '../../../../../models/api/zygosity-type.model';
import {VariantTypeModel} from '../../../../../models/api/variant-type.model';
import {GeneVariantCallTypeModel} from '../../../../../models/api/gene-variant-call-type.model';

const log = Log.create('GeneVariantsComponent');

@Component({
  selector: 'app-gene-variants',
  templateUrl: './gene-variants.component.html',
  styleUrls: ['./gene-variants.component.scss']
})
export class GeneVariantsComponent implements OnInit {
  @Input()
  gene: GeneModel;
  displayNewVariantDialog = false;
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
    this.zygosities = [
      {
        label: 'Hetorzygous',
        value: 'Hetorzygous'
      },
      {
        label: 'Homozygous',
        value: 'Homozygous'
      },
      {
        label: 'Compound Heterozygous',
        value: 'Compound Heterozygous'
      },
    ];
    this.calls = [
      {
        label: 'VOUS',
        value: 'VOUS'
      },
      {
        label: 'Likely pathogenic',
        value: 'Likely pathogenic'
      },
      {
        label: 'Pathogenic',
        value: 'Pathogenic'
      },
      {
        label: 'Benign',
        value: 'Benign'
      },
      {
        label: 'autosomal recessive carrier',
        value: 'autosomal recessive carrier'
      },
    ];

    this.types = [
      {
        label: 'Deletion (whole gene)',
        value: 'Deletion (whole gene)'
      },
      {
        label: 'Partial Deletion (intragenic)',
        value: 'Partial Deletion (intragenic)'
      },
      {
        label: 'Partial Deletion (deleted 5\')',
        value: 'Partial Deletion (deleted 5\')'
      },
      {
        label: 'Partial Deletion (deleted 3\')',
        value: 'Partial Deletion (deleted 3\')'
      },
      {
        label: 'Duplication (whole gene)',
        value: 'Duplication (whole gene)'
      },
      {
        label: 'Partial Duplication (intragenic)',
        value: 'Partial Duplication (intragenic)'
      },
      {
        label: 'Partial Duplication (duplicated 5\')',
        value: 'Partial Duplication (duplicated 5\')'
      },
      {
        label: 'Partial Duplication (duplicated 3\')',
        value: 'Partial Duplication (duplicated 3\')'
      },
      {
        label: 'SNV, predicted lof',
        value: 'SNV, predicted lof'
      },
      {
        label: 'SNV, predicted gof',
        value: 'SNV, predicted gof'
      },
      {
        label: 'Splice site',
        value: 'Splice site'
      },
      {
        label: 'GWAS (within gene or nearest to this gene)',
        value: 'GWAS (within gene or nearest to this gene)'
      },
    ];
  }

  showNewVariantDialog() {
    this.newVariant = <GeneVariantModel>{};
    this.displayNewVariantDialog = true;
  }

  onRowSelect(event) {
    this.router.navigate(['/gene-variant', this.selectedVariant.id]);
  }

  saveVariant() {
    this.gene.geneVariant = [...this.gene.geneVariant, this.newVariant];
    this.displayNewVariantDialog = false;
    this.changeDetector.detectChanges();
  }
}
