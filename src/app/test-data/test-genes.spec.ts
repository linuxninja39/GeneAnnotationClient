
import {GeneModel} from '../models/api/gene.model';
import {TestGeneNames} from './test-gene-names.spec';
import {TestGeneVariants} from './test-gene-variants.spec';
import {TestAnnotations} from './test-annotations.spec';

export const TestGenes: GeneModel[] = [
  {
    id: 1,
    symbol: [{id: 1, name: 'bla', activeDate: new Date()}],
    geneLocations: [{id: 1, chr: 'b', start: 1, end: 2, hgVersion: 19, locus: 'l'}],
    geneName: [TestGeneNames[0], TestGeneNames[1]],
    origin: [{id: 1, name: 'blkj'}],
    synonym: [{id: 1, name: 'bla', activeDate: new Date()}],
    knownFunction: 'known function',
    currentGeneLocation: {id: 1, chr: 'b', start: 1, end: 2, hgVersion: 19, locus: 'l'},
    currentGeneName: TestGeneNames[0],
    currentSymbol: {id: 1, name: 'sym', activeDate: new Date()},
    currentSynonym: {id: 1, name: 'syn', activeDate: new Date()},
    geneVariant: TestGeneVariants,
    annotation: [
      TestAnnotations[0]
    ]
  },
  {
    id: 2,
    symbol: [],
    geneLocations: [],
    geneName: [TestGeneNames[2], TestGeneNames[3]],
    origin: [],
    synonym: []
  }
];
