import {AnnotationModel} from '../models/api/annotation.model';

export const TestAnnotations: AnnotationModel[] = [
  {
    id: 1,
    note: 'Kid gloves',
    modifiedAt: new Date(),
    createdAt: new Date(),
    appUser: {id: 1, name: 'bob'}
  },
];
