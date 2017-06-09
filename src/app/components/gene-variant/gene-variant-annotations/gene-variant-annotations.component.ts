import {Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from "../../../models/api/gene-variant.model";
import {AnnotationModel} from "../../../models/api/annotation.model";
import {TestData} from "../../../services/test-data";

@Component({
  selector: 'app-gene-variant-annotations',
  templateUrl: './gene-variant-annotations.component.html',
  styleUrls: ['./gene-variant-annotations.component.scss']
})
export class GeneVariantAnnotationsComponent implements OnInit {
  @Input()
  geneVariant = <GeneVariantModel>null;
  testData = new TestData();
  newAnnotation: AnnotationModel;
  displayNewAnnotationDialog = false;

  constructor() { }

  ngOnInit() {
  }

  showNewAnnotationDialog() {
    this.newAnnotation = <AnnotationModel>{createdAt: new Date(), modifiedAt: new Date(), user: this.testData.users[0]};
    this.displayNewAnnotationDialog = true;
  }

  saveAnnotation() {
    this.geneVariant.annotations = [...this.geneVariant.annotations, this.newAnnotation];
    this.displayNewAnnotationDialog = false;
  }
}
