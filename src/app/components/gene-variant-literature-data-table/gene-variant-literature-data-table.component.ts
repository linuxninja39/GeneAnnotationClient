import {Component, Input, OnInit} from '@angular/core';
import {GeneVariantModel} from "../../models/api/gene-variant.model";
import {Log} from "ng2-logger";
import {GeneVariantLiteratureModel} from "../../models/api/gene-variant-literature.model";
import {AnnotationModel} from "../../models/api/annotation.model";
import {LiteratureModel} from "../../models/api/literature.model";
import {SelectItem} from "primeng/primeng";
import {LiteratureService} from "../../services/literature.service";

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

  literatureOptions: SelectItem[] = [];
  selectedLiterature: LiteratureModel;

  constructor(
    private literatureService: LiteratureService
  ) { }

  ngOnInit() {
    log.info('geneVariant.literatures', this.geneVariant.literatures);
    this.literatureService
      .getLiteratures()
      .subscribe(
        (literatures) => {
          for (let lit of literatures) {
            log.info("lit: ", lit);
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
    this.currentGeneVariantLiteratureAnnotation = <AnnotationModel>{};
    this.addAnnotationDialogVisible = true;
  }

  showAddLiteratureDialog() {
    this.addLiteratureDialogVisible = true;
  }

  saveAnnotation() {
    if (!this.currentGeneVariantLiterature.annotations) this.currentGeneVariantLiterature.annotations = [];
    this.currentGeneVariantLiterature.annotations.push(this.currentGeneVariantLiteratureAnnotation);
    this.addAnnotationDialogVisible = false;
  }

  saveLiterature() {
    log.info("selectedLit", this.selectedLiterature);
    this.addLiteratureDialogVisible = false;
    this.geneVariant.literatures = [...this.geneVariant.literatures, {id: "gv434", geneVariant: this.geneVariant, literature: this.selectedLiterature}];
  }
}
