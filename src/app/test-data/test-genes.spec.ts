
import {GeneModel} from '../models/api/gene.model';
import {TestGeneNames} from './test-gene-names.spec';
import {TestGeneVariants} from './test-gene-variants.spec';

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
    knownGeneFunction: 'known function',
    currentGeneLocation: {id: 1, chr: 'b', start: 1, end: 2, hgVersion: 19, locus: 'l'},
    currentGeneName: TestGeneNames[0],
    currentSymbol: {id: 1, name: 'sym', activeDate: new Date()},
    currentSynonym: {id: 1, name: 'syn', activeDate: new Date()},
    geneVariant: TestGeneVariants
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
