import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeneModel} from '../../models/api/gene.model';
import {AuthService} from '../../services/auth.service';
import {GeneVariantModel} from '../../models/api/gene-variant.model';
import {GeneVariantService} from '../../services/gene-variant.service';
import {Log} from 'ng2-logger';

const log = Log.create('GeneVariantFormComponent');

@Component({
  selector: 'app-gene-variant-form',
  templateUrl: './gene-variant-form.component.html',
  styleUrls: ['./gene-variant-form.component.scss']
})
export class GeneVariantFormComponent implements OnInit {
  private _display: boolean;

  @Input()
  gene: GeneModel;
  zygosities: SelectItem[] = [];
  types: SelectItem[] = [];
  calls: SelectItem[] = [];

  newVariantForm: FormGroup;

  @Output()
  newEventSavedEventEmitter = new EventEmitter<GeneVariantModel>();

  @Input()
  set display(d: boolean) {
    this.displayChange.emit(d);
    this._display = d;
  }
  get display(): boolean {
    return this._display;
  }

  @Output()
  displayChange = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private geneVariantService: GeneVariantService) {
  }

  ngOnInit() {
    this.setupDropdownOptions();
    this.setupNewVariantForm();
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

  saveVariant(): void {
    const newVariant = <GeneVariantModel>{...this.newVariantForm.value};
    log.info('newVariat obj', newVariant);
    log.info('newVariat string', JSON.stringify(newVariant));
    this.geneVariantService
      .saveGeneVariant(newVariant)
      .subscribe(
        (geneVariant) => {
          this.gene.geneVariant = [...this.gene.geneVariant, geneVariant];
          this.newVariantForm.reset();
          this.newEventSavedEventEmitter.emit(geneVariant);
          this.display = false;
        }
      );
  }

}
