import {TestBed, inject} from '@angular/core/testing';

import {CurrentPreviousItemsService} from './current-previous-items.service';
import {TestGenes} from '../test-data/test-genes.spec';
import {GeneModel} from '../models/api/gene.model';
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {AppUserModel} from '../models/api/app-user.model';
import {PathogenicSupportCategory} from '../models/api/pathogenic-support-category.model';

const TestAppUsers: AppUserModel[] = [
  {
    id: 1,
    name: 'b@b.com'
  }
];

const TestGeneVariants: GeneVariantModel[] = [
  {
    id: 1,
    zygosityType: {id: 1, name: 'zy'},
    variantType: {id: 1, name: 'varT'},
    currentCallType: {
      id: 2,
      geneVariantId: 1,
      callTypeId: 2,
      callType: {name: 'VOUS'},
      activeDate: new Date(),
      createdBy: TestAppUsers[0]
    },
    callType: [
      {
        id: 1,
        geneVariantId: 1,
        callTypeId: 1,
        activeDate: new Date(),
        createdBy: TestAppUsers[0]
      }
    ],
    start: 44434,
    end: 54334,
    annotation: [
      {
        id: 1,
        note: 'yo',
        createdAt: new Date(),
        appUser: {id: 1, name: 'jacob'}
      }
    ],
    geneVariantLiterature: [
      {
        geneVariantId: 1,
        literature: {
          title: 'my lit title',
          url: 'http://liturl',
          pubMedId: '1',
          details: 'um, cool details. How many times',
          author: []
        },
        pathogenicSupportCategory: {name: PathogenicSupportCategory.Supportive},
        appUser: {id: 1, name: 'j@j.com'},
        addedAt: new Date()
      }
    ]
  },
  {
    id: 2,
    zygosityType: {id: 1, name: 'zy'},
    variantType: {id: 1, name: 'varT'},
    callType: [
      {
        id: 1,
        geneVariantId: 1,
        callTypeId: 1,
        activeDate: new Date(),
        createdBy: TestAppUsers[0]
      }
    ],
    start: 64434,
    end: 74334,
  }
];

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
        const geneVariant = TestGeneVariants[0];
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
