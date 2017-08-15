import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from '../../models/api/gene-variant.model';
import {Log} from 'ng2-logger';
import {GeneVariantLiteratureModel} from '../../models/api/gene-variant-literature.model';
import {AnnotationModel} from '../../models/api/annotation.model';
import {LiteratureModel} from '../../models/api/literature.model';
import {SelectItem} from 'primeng/primeng';
import {LiteratureService} from '../../services/literature.service';
import {GeneVariantService} from '../../services/gene-variant.service';
import {AnnotationService} from '../../services/annotation.service';
import {AuthService} from '../../services/auth.service';

const log = Log.create('GeneVariantLiteratureDataTableComponent');

@Component({
  selector: 'app-gene-variant-literature-data-table',
  templateUrl: './gene-variant-literature-data-table.component.html',
  styleUrls: ['./gene-variant-literature-data-table.component.scss']
})
export class GeneVariantLiteratureDataTableComponent implements OnInit {
  @Input()
  geneVariant: GeneVariantModel;

  dataKey;

  addAnnotationDialogVisible = false;
  addLiteratureDialogVisible = false;

  currentGeneVariantLiterature: GeneVariantLiteratureModel;
  annotation: AnnotationModel;

  literatureOptions: SelectItem[] = [];
  selectedLiterature: LiteratureModel;

  constructor(
    private literatureService: LiteratureService,
    private annotationService: AnnotationService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
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

  showAddAnnotationDialog(geneVariantLiterature: GeneVariantLiteratureModel) {
    this.currentGeneVariantLiterature = geneVariantLiterature;
    this.annotation = <AnnotationModel>{
      appUserId: this.authService.User.id,
      createdAt: new Date()
    };
    this.addAnnotationDialogVisible = true;
  }

  showAddLiteratureDialog() {
    this.addLiteratureDialogVisible = true;
  }

  saveAnnotation() {
    this.annotationService
      .addGeneVariantLiteratureAnnotation(this.currentGeneVariantLiterature.id, this.annotation)
      .subscribe(
        (annotation: AnnotationModel) => {
          if (!this.currentGeneVariantLiterature.annotation) {
            this.currentGeneVariantLiterature.annotation = [];
          }
          this.currentGeneVariantLiterature.annotation = [
            ...this.currentGeneVariantLiterature.annotation,
            this.annotation
          ];

          log.info('geneVariant is no', this.geneVariant);
          this.changeDetector.detectChanges();
          this.addAnnotationDialogVisible = false;
        }
      );

  }

  saveLiterature() {
    log.info('selectedLit', this.selectedLiterature);
    this.addLiteratureDialogVisible = false;
    this.literatureService
      .addGeneVariantLiterature(this.geneVariant.id, this.selectedLiterature.id)
      .subscribe(
        (geneVariantLiterature: GeneVariantLiteratureModel) => {
          this.geneVariant.geneVariantLiterature = [
            ...this.geneVariant.geneVariantLiterature,
            geneVariantLiterature
          ];
        },
        (err) => {
          log.error('got error adding geneVariantLiterature', err);
        }
      );

  }

  onRowSelect(row) {
    log.info('row selected', row);
    log.info('data key', this.dataKey);
  }
}
