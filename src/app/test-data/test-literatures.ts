import {LiteratureModel} from '../models/api/literature.model';

export const TestLiteratures: LiteratureModel[] = [
  {
    title: 'lit 1',
    url: 'http://lit1.com',
    pubMedId: '1',
    details: 'cool',
    author: [
      {
        id: 1,
        name: 'Bob the cool author'
      }
    ]
  },
    {
    title: 'lit 2',
    url: 'http://lit2.com',
    author: [
      {
        id: 2,
        name: 'Cracks of fear'
      }
    ]
  }
];
