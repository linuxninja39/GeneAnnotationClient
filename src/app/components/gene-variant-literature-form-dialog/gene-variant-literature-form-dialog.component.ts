import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LiteratureService} from '../../services/literature.service';
import {SelectItem} from 'primeng/primeng';
import {Log} from 'ng2-logger';
import {GeneVariantLiteratureModel} from '../../models/api/gene-variant-literature.model';
import {GeneVariantModel} from '../../models/api/gene-variant.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PathogenicSupportCategory} from '../../models/api/pathogenic-support-category.model';
import {GeneVariantLiteratureService} from '../../services/gene-variant-literature.service';

const log = Log.create('GeneVariantLiteratureFormDialogComponent');

@Component({
  selector: 'app-gene-variant-literature-form-dialog',
  templateUrl: './gene-variant-literature-form-dialog.component.html',
  styleUrls: ['./gene-variant-literature-form-dialog.component.scss']
})
export class GeneVariantLiteratureFormDialogComponent implements OnInit {
  private _display: boolean;

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

  @Input()
  geneVariant: GeneVariantModel;

  literatureOptions: SelectItem[];
  categoryOptions: SelectItem[];
  geneVariantLiteratureFormGroup: FormGroup;

  get annotationFormArray(): FormArray {
    return this.geneVariantLiteratureFormGroup.get('annotation') as FormArray;
  }

  constructor(private literatureService: LiteratureService,
              private geneVariantLiteratureService: GeneVariantLiteratureService,
              private formBuilder: FormBuilder,
              private authService: AuthService
  ) {
    this.literatureOptions = [];
    this.categoryOptions = [];
  }

  ngOnInit() {
    this.getLiterature();
    this.setupForm();
    this.setupPathogenicOptions();
  }

  private setupPathogenicOptions() {
    for (const i in PathogenicSupportCategory) {
      this.categoryOptions.push(
        {
          label: i,
          value: {name: i}
        }
      );
    }
  }

  private getLiterature() {
    this.literatureService
      .getLiteratures()
      .subscribe(
        (literatures) => {
          for (const lit of literatures) {
            log.info('lit: ', lit);
            this.literatureOptions.push(
              {
                label: lit.title,
                value: lit
              }
            );
          }
        }
      )
    ;
  }

  private setupForm() {
    this.geneVariantLiteratureFormGroup = this.formBuilder.group(
      {
        literature: [''],
        appUser: [this.authService.User],
        annotation: this.formBuilder.array(
          [
            this.formBuilder.group(
              {
                note: '',
                appUser: this.authService.User,
                createdAt: new Date()
              }
            )
          ]
        ),
        addedAt: [new Date()],
        pathogenicSupportCategory: ['']
      }
    );
  }

  saveLiterature() {
    const geneVariantLiterature: GeneVariantLiteratureModel = this.geneVariantLiteratureFormGroup.value;
    this.geneVariantLiteratureService
      .addGeneVariantLiterature(geneVariantLiterature)
      .subscribe(
        (gvl: GeneVariantLiteratureModel) => {
          this.display = false;
          this.geneVariant.geneVariantLiterature = [
            ...this.geneVariant.geneVariantLiterature,
            gvl
          ];
        },
        (err) => {
          log.error('got error adding geneVariantLiterature', err);
        }
      );
  }
}
