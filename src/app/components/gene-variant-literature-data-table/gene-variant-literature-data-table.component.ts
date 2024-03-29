import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from '../../models/api/gene-variant.model';
import {Log} from 'ng2-logger';
import {GeneVariantLiteratureModel} from '../../models/api/gene-variant-literature.model';
import {AnnotationModel} from '../../models/api/annotation.model';
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

  constructor(
    private annotationService: AnnotationService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
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
        (a: AnnotationModel) => {
          if (!this.currentGeneVariantLiterature.annotation) {
            this.currentGeneVariantLiterature.annotation = [];
          }
          this.currentGeneVariantLiterature.annotation = [
            ...this.currentGeneVariantLiterature.annotation,
            a
          ];

          this.addAnnotationDialogVisible = false;
        }
      );

  }


  onRowSelect(row) {
    log.info('row selected', row);
    log.info('data key', this.dataKey);
  }
}
