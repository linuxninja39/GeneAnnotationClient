import {BaseModel} from './base.model';
import {AuthorModel} from './author.model';
import {AnnotationModel} from './annotation.model';
import {AppUserModel} from './app-user.model';
/**
 * Created by jboswell on 5/30/2017.
 */

export interface LiteratureModel extends BaseModel {
  title: string;
  url: string;
  pubMedId?: string;
  abstract?: string;
  author: AuthorModel[];
  annotation?: AnnotationModel[];
  addedBy: AppUserModel;
  addedOn: Date;
}
