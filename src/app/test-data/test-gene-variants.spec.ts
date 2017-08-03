
import {GeneVariantModel} from '../models/api/gene-variant.model';
import {TestGenes} from './test-genes.spec';

export const TestGeneVariants: GeneVariantModel[] = [
  {
    id: 1,
    gene: TestGenes[0],
    zygosityType: {id: 1, name: 'zy'},
    variantType: {id: 1, name: 'varT'},
    callType: {id: 1, name: 'call'},
  }
];
