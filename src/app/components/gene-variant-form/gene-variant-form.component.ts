import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeneModel} from '../../models/api/gene.model';
import {AuthService} from '../../services/auth.service';
import {GeneVariantModel} from '../../models/api/gene-variant.model';
import {GeneVariantService} from '../../services/gene-variant.service';
import {Log} from 'ng2-logger';
import {RecursiveSelectItem} from '../variant-type-dropdown/recursive-select-item';
import {VariantTypeModel} from '../../models/api/variant-type.model';
import {VariantTypeService} from '../../services/variant-type.service';

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
  types: VariantTypeModel[] = [];
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
              private geneVariantService: GeneVariantService,
              private variantTypeService: VariantTypeService) {
  }

  ngOnInit() {
    this.setupDropdownOptions();
    this.setupNewVariantForm();
  }

  private setupDropdownOptions() {
    this.zygosities = [
      {
        label: 'Hetorzygous',
        value: {name: 'Hetorzygous'}
      },
      {
        label: 'Homozygous',
        value: {name: 'Homozygous'}
      },
      {
        label: 'Compound Heterozygous',
        value: {name: 'Compound Heterozygous'}
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

    this.variantTypeService.getVariantTypeTree()
      .subscribe(
        (variantTypes) => {
          this.types = variantTypes;
        }
      );
  }

  get callTypesFormArray(): FormArray {
    return this.newVariantForm.get('callType') as FormArray;
  }

  private setupNewVariantForm() {
    this.newVariantForm = this.formBuilder.group(
      {
        geneId: ['', Validators.required],
        zygosityType: ['', Validators.required],
        variantType: ['', Validators.required],
        callType: this.formBuilder.array(
          [
            this.formBuilder.group(
              {
                activeDate: [new Date(), Validators.required],
                createdBy: [this.authService.User, Validators.required],
                callType: this.formBuilder.group(
                  {
                    name: ['', Validators.required]
                  }
                )
              }
            )
          ]
        ),
        start: ['', Validators.required],
        end: ['', Validators.required],
      }
    );

    this.newVariantForm.valueChanges.subscribe(
      (data) => {
        console.log('form changed', data);
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
          this.newVariantForm.reset();
          this.newEventSavedEventEmitter.emit(geneVariant);
          this.display = false;
        }
      );
  }

}
