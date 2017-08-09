import {LiteratureModel} from '../models/api/literature.model';

export const TestLiteratures: LiteratureModel[] = [
  {
    title: 'lit 1',
    url: new URL('http://lit1.com'),
    author: [
      {
        id: 1,
        name: 'Bob the cool author'
      }
    ]
  },
    {
    title: 'lit 2',
    url: new URL('http://lit2.com'),
    author: [
      {
        id: 2,
        name: 'Cracks of fear'
      }
    ]
  }
];
