import {Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from '../../../models/api/gene-variant.model';
import {AnnotationModel} from '../../../models/api/annotation.model';
import {Log} from 'ng2-logger';

const log = Log.create('GeneVariantAnnotationsComponent');

@Component({
  selector: 'app-gene-variant-annotations',
  templateUrl: './gene-variant-annotations.component.html',
  styleUrls: ['./gene-variant-annotations.component.scss']
})
export class GeneVariantAnnotationsComponent implements OnInit {
  @Input()
  geneVariant = <GeneVariantModel>null;
  newAnnotation: AnnotationModel;
  displayNewAnnotationDialog = false;
  selectedAnnotation;

  constructor() { }

  ngOnInit() {
  }

  showNewAnnotationDialog() {
    this.newAnnotation = <AnnotationModel>{createdAt: new Date(), modifiedAt: new Date(), appUser: {name: 'bob'}};
    this.displayNewAnnotationDialog = true;
  }

  saveAnnotation() {
    this.geneVariant.annotation = [...this.geneVariant.annotation, this.newAnnotation];
    this.displayNewAnnotationDialog = false;
  }


  onRowSelect(row) {
    log.info('row selected', row);
  }
}
