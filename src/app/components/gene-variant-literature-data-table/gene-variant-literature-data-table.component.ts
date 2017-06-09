import {Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from "../../models/api/gene-variant.model";
import {Log} from "ng2-logger";
import {GeneVariantLiteratureModel} from "../../models/api/gene-variant-literature.model";
import {AnnotationModel} from "../../models/api/annotation.model";

const log = Log.create('GeneVariantLiteratureDataTableComponent');

@Component({
  selector: 'app-gene-variant-literature-data-table',
  templateUrl: './gene-variant-literature-data-table.component.html',
  styleUrls: ['./gene-variant-literature-data-table.component.scss']
})
export class GeneVariantLiteratureDataTableComponent implements OnInit {
  @Input()
  geneVariant: GeneVariantModel;

  addAnnotationDialogVisible = false;
  addLiteratureDialogVisible = false;

  currentGeneVariantLiterature: GeneVariantLiteratureModel;
  currentGeneVariantLiteratureAnnotation: AnnotationModel;

  constructor() { }

  ngOnInit() {
    log.info('geneVariant.literatures', this.geneVariant.literatures);
  }

  showAddAnnotationDialog(geneVariantLiterature: GeneVariantLiteratureModel) {
    this.currentGeneVariantLiterature = geneVariantLiterature;
    this.currentGeneVariantLiteratureAnnotation = <AnnotationModel>{};
    this.addAnnotationDialogVisible = true;
  }

  saveAnnotation() {
    this.currentGeneVariantLiterature.annotations.push(this.currentGeneVariantLiteratureAnnotation);
    this.addAnnotationDialogVisible = false;
  }

  showAddLiteratureDialog() {
    this.addLiteratureDialogVisible = true;
  }
}
