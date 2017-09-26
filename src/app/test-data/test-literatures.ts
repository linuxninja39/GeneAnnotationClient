import {LiteratureModel} from '../models/api/literature.model';

export const TestLiteratures: LiteratureModel[] = [
  {
    title: 'lit 1',
    url: 'http://lit1.com',
    pubMedId: '1',
    abstract: 'cool',
    author: [
      {
        id: 1,
        name: 'Bob the cool author'
      }
    ],
    addedOn: new Date(),
    addedBy: {name: 'bob@bob.cocm'}
  },
  {
    title: 'lit 2',
    url: 'http://lit2.com',
    pubMedId: 'pdr11',
    abstract: 'stuff',
    author: [
      {
        id: 2,
        name: 'Cracks of fear'
      }
    ],
    addedOn: new Date(),
    addedBy: {name: 'bob@bob.cocm'}
  }
];
