import {BaseModel} from './base.model';
import {AnnotationModel} from './annotation.model';
import {LiteratureModel} from './literature.model';
/**
 * Created by jboswell on 5/30/2017.
 */

export interface AuthorModel extends BaseModel {
  name: string;
  annotations?: AnnotationModel[];
  literatures?: LiteratureModel[];
}
