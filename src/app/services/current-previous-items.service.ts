import { Injectable } from '@angular/core';
import {GeneModel} from '../models/api/gene.model';
import {ActiveDateBaseModel} from '../models/api/active-date-base.model';

@Injectable()
export class CurrentPreviousItemsService {
  static readonly CURRENT_PROPERTIES = [
    'GeneName',
    'Synonym',
    'GeneLocation',
  ];

  static readonly PROPERTY_PREFACE = 'current';

  constructor() { }

  updateGeneModel(gene: GeneModel) {
    for (const fieldName of CurrentPreviousItemsService.CURRENT_PROPERTIES) {
      const fieldKey = CurrentPreviousItemsService.PROPERTY_PREFACE + fieldName;
      const fieldArray = gene[this.listFieldName(fieldName)];

      fieldArray.sort((a, b) => this.sort(a, b));

      gene[fieldKey] = fieldArray.shift();
    }
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
