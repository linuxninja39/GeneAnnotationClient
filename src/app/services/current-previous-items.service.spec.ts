import {TestBed, inject} from '@angular/core/testing';

import {CurrentPreviousItemsService} from './current-previous-items.service';
import {TestGenes} from '../test-data/test-genes.spec';
import {GeneModel} from '../models/api/gene.model';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {AppUserModel} from '../models/api/app-user.model';
import {PathogenicSupportCategory} from '../models/api/pathogenic-support-category.model';
import {TestGeneVariants} from '../test-data/test-gene-variants.spec';

const TestAppUsers: AppUserModel[] = [
  {
    id: 1,
    name: 'b@b.com'
  }
];

const TestVariants: GeneVariantModel[] = JSON.parse(JSON.stringify(TestGeneVariants));

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
    'should populate all "current" gene properties',
    inject([CurrentPreviousItemsService],
      (service: CurrentPreviousItemsService) => {
        const gene = TestGenes[0];
        const origGene = <GeneModel>JSON.parse(JSON.stringify(gene));
        service.updateGeneModel(gene);
        for (const fieldName of CurrentPreviousItemsService.CURRENT_GENE_PROPERTIES) {
          const lcFieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
          console.log('lcFieldName', lcFieldName);
          console.log('fieldName', fieldName);
          console.log(CurrentPreviousItemsService.PROPERTY_PREFACE + fieldName,
            gene[CurrentPreviousItemsService.PROPERTY_PREFACE + fieldName]);
          console.log('origGene[lcFieldName][0]', origGene[lcFieldName][0]);
          expect(gene[CurrentPreviousItemsService.PROPERTY_PREFACE + fieldName].id)
            .toEqual(origGene[lcFieldName][0].id, 'current' + fieldName + ' should be populated');
        }
      }
    )
  );

  it(
    'should populate all "current" gene variant properties',
    inject([CurrentPreviousItemsService],
      (service: CurrentPreviousItemsService) => {
        const geneVariant = TestVariants[0];
        const origGeneVariant = <GeneVariantModel>JSON.parse(JSON.stringify(geneVariant));
        service.updateGeneVariantModel(geneVariant);
        for (const fieldName of CurrentPreviousItemsService.CURRENT_GENE_VARIANT_PROPERTIES) {
          const lcFieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
          console.log('origGeneVariant[lcFieldName]', origGeneVariant[lcFieldName]);
          expect(geneVariant[CurrentPreviousItemsService.PROPERTY_PREFACE + fieldName].id)
            .toEqual(origGeneVariant[lcFieldName][0].id, 'current' + fieldName + ' should be populated');
        }
      }
    )
  );

});
