
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {TestGenes} from './test-genes.spec';
import {TestGeneNames} from './test-gene-names.spec';

export const TestGeneVariants: GeneVariantModel[] = [
  {
    id: 1,
    gene: {
      id: 2,
      symbol: [],
      chromosome: {id: 1, name: '1'},
      geneLocation: [],
      geneName: [TestGeneNames[2], TestGeneNames[3]],
      origin: [],
      synonym: []
    },
    zygosityType: {id: 1, name: 'zy'},
    variantType: {id: 1, name: 'varT'},
    callType: {id: 1, name: 'call'},
  },
  {
    id: 2,
    gene: {
      id: 2,
      symbol: [],
      chromosome: {id: 1, name: '1'},
      geneLocation: [],
      geneName: [TestGeneNames[2], TestGeneNames[3]],
      origin: [],
      synonym: []
    },
    zygosityType: {id: 1, name: 'zy'},
    variantType: {id: 1, name: 'varT'},
    callType: {id: 2, name: 'other call'},
  }
];
