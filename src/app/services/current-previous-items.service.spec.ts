import { TestBed, inject } from '@angular/core/testing';

import { CurrentPreviousItemsService } from './current-previous-items.service';
import {TestGenes} from '../test-data/test-genes.spec';
import {GeneModel} from '../models/api/gene.model';

describe('CurrentPreviousItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentPreviousItemsService
      ]
    });
  });

  it('should be created', inject([CurrentPreviousItemsService], (service: CurrentPreviousItemsService) => {
    expect(service).toBeTruthy();
  }));

  it(
    'should populate all current properties',
    inject([CurrentPreviousItemsService],
      (service: CurrentPreviousItemsService) => {
        const gene = TestGenes[0];
        const origGene = <GeneModel>deepCopy(gene);
        service.updateGeneModel(gene);
        for (const fieldName of CurrentPreviousItemsService.CURRENT_PROPERTIES) {
          const lcFieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
          expect(gene[CurrentPreviousItemsService.PROPERTY_PREFACE + fieldName])
            .toEqual(origGene[lcFieldName][0], 'current' + fieldName + ' should be populated');
        }
      }
    )
  );
});

function deepCopy(obj) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' !== typeof obj) {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }

  throw new Error('Unable to copy obj! Its type isn\'t supported.');
}
