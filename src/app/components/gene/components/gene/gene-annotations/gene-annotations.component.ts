import {Component, Input, OnInit} from '@angular/core';
import {GeneModel} from "../../../../../models/api/gene.model";
import {AnnotationModel} from "../../../../../models/api/annotation.model";
import {Log} from "ng2-logger";

const log = Log.create('GeneVariantsComponent');

@Component({
  selector: 'app-gene-notes',
  templateUrl: './gene-annotations.component.html',
  styleUrls: ['./gene-annotations.component.scss']
})
export class GeneAnnotationsComponent implements OnInit {
  @Input()
  gene: GeneModel;
  selectedAnnotation: AnnotationModel = <AnnotationModel>{};
  displayNewAnnotationDialog: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showNewAnnotationDialog() {
    this.selectedAnnotation = <AnnotationModel>{};
    this.selectedAnnotation.user = {id: "joe", name: "Joe"};
    this.selectedAnnotation.createdAt = new Date();
    this.selectedAnnotation.modifiedAt = new Date();
    this.displayNewAnnotationDialog = true;
  }

  saveAnnotation() {
    this.displayNewAnnotationDialog = false;
    if (!this.gene.annotations) this.gene.annotations = [];

    this.gene.annotations = [...this.gene.annotations, this.selectedAnnotation];
  }
}
