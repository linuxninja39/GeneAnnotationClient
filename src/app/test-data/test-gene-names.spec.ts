
import {GeneNameModel} from '../models/api/gene-name.model';

const earlierDate = new Date();
earlierDate.setDate(earlierDate.getDate() - 1);

export const TestGeneNames: GeneNameModel[] = [
  {id: 1, name: 'cool name', activeDate: new Date()},
  {id: 2, name: 'cool name2', activeDate: earlierDate},
  {id: 3, name: 'cool other name', activeDate: new Date()},
  {id: 4, name: 'cool other name2', activeDate: earlierDate},
];
