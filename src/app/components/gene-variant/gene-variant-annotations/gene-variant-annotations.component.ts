import {Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from '../../../models/api/gene-variant.model';
import {AnnotationModel} from '../../../models/api/annotation.model';
import {Log} from 'ng2-logger';
import {AnnotationService} from '../../../services/annotation.service';
import {AuthService} from '../../../services/auth.service';

const log = Log.create('GeneVariantAnnotationsComponent');

@Component({
  selector: 'app-gene-variant-annotations',
  templateUrl: './gene-variant-annotations.component.html',
  styleUrls: ['./gene-variant-annotations.component.scss']
})
export class GeneVariantAnnotationsComponent implements OnInit {
  @Input()
  geneVariant: GeneVariantModel;
  newAnnotation: AnnotationModel;
  displayNewAnnotationDialog = false;
  selectedAnnotation;

  constructor(
    private annotationService: AnnotationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  showNewAnnotationDialog() {
    this.newAnnotation = <AnnotationModel>{createdAt: new Date(), modifiedAt: new Date(), appUser: this.authService.User};
    this.displayNewAnnotationDialog = true;
  }

  saveAnnotation() {
    this.annotationService
      .addGeneVariantAnnotation(this.geneVariant.id, this.newAnnotation)
      .subscribe(
        (annotation: AnnotationModel) => {
          if (!this.geneVariant.annotation) {
            this.geneVariant.annotation = [];
          }
          this.geneVariant.annotation = [...this.geneVariant.annotation, annotation];
          this.displayNewAnnotationDialog = false;
        },
        (err) => {
          log.error('failed to save annotation', err);
          this.displayNewAnnotationDialog = false;
        }
      );
  }

  onRowSelect(row) {
    log.info('row selected', row);
  }
}
