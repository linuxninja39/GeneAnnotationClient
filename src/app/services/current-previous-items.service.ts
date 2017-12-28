import {Injectable} from '@angular/core';
import {GeneModel} from '../models/api/gene.model';
import {ActiveDateBaseModel} from '../models/api/active-date-base.model';
import {GeneVariantModel} from '../models/api/gene-variant.model';

@Injectable()
export class CurrentPreviousItemsService {
  static readonly CURRENT_GENE_PROPERTIES = [
    'GeneName',
    'Synonym',
    'Symbol'
  ];

  static readonly CURRENT_GENE_VARIANT_PROPERTIES = [
    'CallType'
  ];

  static readonly PROPERTY_PREFACE = 'current';

  constructor() {
  }

  updateGeneModel(gene: GeneModel): void {
    for (const fieldName of CurrentPreviousItemsService.CURRENT_GENE_PROPERTIES) {
      const fieldKey = CurrentPreviousItemsService.PROPERTY_PREFACE + fieldName;
      const fieldArray = gene[this.listFieldName(fieldName)];

      fieldArray.sort((a, b) => this.sort(a, b));

      gene[fieldKey] = fieldArray.shift();
    }

    this.setCurrentGeneLocation(gene);

    if (gene.geneVariant) {
      for (const geneVariant of gene.geneVariant) {
        this.updateGeneVariantModel(geneVariant);
      }
    }
  }

  updateGeneVariantModel(geneVariant: GeneVariantModel): GeneVariantModel {
    for (const fieldName of CurrentPreviousItemsService.CURRENT_GENE_VARIANT_PROPERTIES) {
      const fieldKey = CurrentPreviousItemsService.PROPERTY_PREFACE + fieldName;
      const fieldArray = geneVariant[this.listFieldName(fieldName)];

      if (fieldArray) {
        fieldArray.sort((a, b) => this.sort(a, b));
      } else {
        return geneVariant;
      }

      geneVariant[fieldKey] = fieldArray.shift();
    }

    return geneVariant;
  }

  private setCurrentGeneLocation(gene: GeneModel): void {
    gene.currentGeneLocation = gene.geneLocations.find(
      (gl => {return gl.hgVersion === 19})
    );
  }

  sort(a: ActiveDateBaseModel, b: ActiveDateBaseModel) {
    if (a.activeDate > b.activeDate) {
      return -1;
    }
    if (a.activeDate < b.activeDate) {
      return 1;
    }
    return 0;
  }

  listFieldName(fieldName: string) {
    return fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
  }

}
