import {BaseModel} from './base.model';
import {AuthorModel} from './author.model';
import {AnnotationModel} from './annotation.model';
/**
 * Created by jboswell on 5/30/2017.
 */

export interface LiteratureModel extends BaseModel {
  title: string;
  url: string;
  pubMedId?: string;
  details?: string;
  author: AuthorModel[];
  annotation?: AnnotationModel[];
}
