import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GeneModel} from '../../../../../models/api/gene.model';
import { Log } from 'ng2-logger';
import {Router} from '@angular/router';
import {SelectItem} from 'primeng/primeng';
import {GeneVariantModel} from '../../../../../models/api/gene-variant.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeneVariantService} from '../../../../../services/gene-variant.service';
import {AuthService} from '../../../../../services/auth.service';

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
  displayCallHistoryDialog = false;
  newVariant: GeneVariantModel;
  zygosities: SelectItem[] = [];
  types: SelectItem[] = [];
  calls: SelectItem[] = [];
  selectedVariant: GeneVariantModel;

  newVariantForm: FormGroup;
  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private geneVariantService: GeneVariantService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setupDropdownOptions();
    this.setupNewVariantForm();
  }

  showCallHistory(show: boolean, geneVariant: GeneVariantModel) {
    this.selectedVariant = geneVariant;
    this.displayCallHistoryDialog = show;
  }

  private setupNewVariantForm() {
    this.newVariantForm = this.formBuilder.group(
      {
        geneId: ['', Validators.required],
        zygosityTypeId: ['', Validators.required],
        variantTypeId: ['', Validators.required],
        callType: this.formBuilder.array([
          {
            activeDate: [new Date(), Validators.required],
            createdBy: [this.authService.User, Validators.required],
            callType: this.formBuilder.group(
              {
                name: ['', Validators.required]
              }
            )
          }
        ]),
        start: [this.gene.currentGeneLocation.start, Validators.required],
        end: [this.gene.currentGeneLocation.end, Validators.required],
      }
    );
  }

  private setupDropdownOptions() {
    this.zygosities = [
      {
        label: 'Hetorzygous',
        value: 1
      },
      {
        label: 'Homozygous',
        value: 2
      },
      {
        label: 'Compound Heterozygous',
        value: 3
      },
    ];
    this.calls = [
      {
        label: 'VOUS',
        value: 1
      },
      {
        label: 'Likely pathogenic',
        value: 2
      },
      {
        label: 'Pathogenic',
        value: 3
      },
      {
        label: 'Benign',
        value: 4
      },
      {
        label: 'autosomal recessive carrier',
        value: 5
      },
    ];

    this.types = [
      {
        label: 'Deletion (whole gene)',
        value: 1
      },
      {
        label: 'Partial Deletion (intragenic)',
        value: 2
      },
      {
        label: 'Partial Deletion (deleted 5\')',
        value: 3
      },
      {
        label: 'Partial Deletion (deleted 3\')',
        value: 4
      },
      {
        label: 'Duplication (whole gene)',
        value: 5
      },
      {
        label: 'Partial Duplication (intragenic)',
        value: 6
      },
      {
        label: 'Partial Duplication (duplicated 5\')',
        value: 7
      },
      {
        label: 'Partial Duplication (duplicated 3\')',
        value: 8
      },
      {
        label: 'SNV, predicted lof',
        value: 9
      },
      {
        label: 'SNV, predicted gof',
        value: 10
      },
      {
        label: 'Splice site',
        value: 11
      },
      {
        label: 'GWAS (within gene or nearest to this gene)',
        value: 12
      },
    ];
  }

  showNewVariantDialog(): void {
    this.newVariant = <GeneVariantModel>{};
    this.displayNewVariantDialog = true;
  }

  onRowSelect(event) {
    this.router.navigate(['/gene-variant', this.selectedVariant.id]);
  }

  saveVariant() {
    const newVariant = <GeneVariantModel>{...this.newVariantForm.value};
    newVariant.geneId = this.gene.id;
    log.info('newVariat obj', newVariant);
    log.info('newVariat string', JSON.stringify(newVariant));
    this.geneVariantService
      .saveGeneVariant(newVariant)
      .subscribe(
        (geneVariant) => {
          this.gene.geneVariant = [...this.gene.geneVariant, geneVariant];
          this.displayNewVariantDialog = false;
          this.newVariantForm.reset();
          this.changeDetector.detectChanges();
        }
      );
  }
}
