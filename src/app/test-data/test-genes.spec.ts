
import {GeneModel} from '../models/api/gene.model';
import {TestGeneNames} from './test-gene-names.spec';

export const TestGenes: GeneModel[] = [
  {
    id: 1,
    symbol: [],
    chromosome: {id: 1, name: '1'},
    geneLocation: [],
    geneName: [TestGeneNames[0], TestGeneNames[1]],
    origin: [],
    synonym: [],
    geneNameExpansion: 'name expansion',
    knownGeneFunction: 'known function'
  },
  {
    id: 2,
    symbol: [],
    chromosome: {id: 1, name: '1'},
    geneLocation: [],
    geneName: [TestGeneNames[2], TestGeneNames[3]],
    origin: [],
    synonym: []
  }
];
