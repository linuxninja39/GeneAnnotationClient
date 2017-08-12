import {Component, Input, OnInit} from '@angular/core';
import {GeneModel} from '../../../../../models/api/gene.model';
import {AnnotationModel} from '../../../../../models/api/annotation.model';
import {Log} from 'ng2-logger';
import {AuthService} from '../../../../../services/auth.service';
import {AnnotationService} from '../../../../../services/annotation.service';

const log = Log.create('GeneVariantsComponent');

@Component({
  selector: 'app-gene-annotations',
  templateUrl: './gene-annotations.component.html',
  styleUrls: ['./gene-annotations.component.scss']
})
export class GeneAnnotationsComponent implements OnInit {
  @Input()
  gene: GeneModel;
  selectedAnnotation: AnnotationModel = <AnnotationModel>{};
  displayNewAnnotationDialog = false;

  constructor(
    private authService: AuthService,
    private annotationService: AnnotationService
  ) { }

  ngOnInit() {
  }

  showNewAnnotationDialog() {
    this.selectedAnnotation = <AnnotationModel>{};
    this.selectedAnnotation.appUser = {id: 'joe', name: 'Joe'};
    this.selectedAnnotation.createdAt = new Date();
    this.selectedAnnotation.modifiedAt = new Date();
    this.displayNewAnnotationDialog = true;
  }

  saveAnnotation() {
    this.annotationService
      .addGeneAnnotations(this.gene.id, this.selectedAnnotation)
      .subscribe(
        (annotation: AnnotationModel) => {
          this.displayNewAnnotationDialog = false;
          if (!this.gene.annotation) {
            this.gene.annotation = [];
          }

          this.gene.annotation = [...this.gene.annotation, annotation];
        }
      );
  }

  onRowSelect(row) {
    log.info('row selected', row);
  }
}
