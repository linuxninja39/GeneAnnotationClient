
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {PathogenicSupportCategory} from '../models/api/pathogenic-support-category.model';

export const TestGeneVariants: GeneVariantModel[] = [
  {
    id: 1,
    geneId: 1,
    zygosityType: {id: 1, name: 'zy'},
    variantType: {id: 1, name: 'varT'},
    callType: {id: 1, name: 'call'},
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
    geneId: 1,
    zygosityType: {id: 1, name: 'zy'},
    variantType: {id: 1, name: 'varT'},
    callType: {id: 2, name: 'other call'},
    start: 64434,
    end: 74334,
  }
];
