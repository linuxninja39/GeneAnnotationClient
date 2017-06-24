import {BaseModel} from "./base.model";
import {AuthorModel} from "./author.model";
import {AnnotationModel} from "./annotation.model";
/**
 * Created by jboswell on 5/30/2017.
 */

export interface LiteratureModel extends BaseModel {
  title: string;
  url: URL;
  details?: string;
  author: AuthorModel;
  annotations?: AnnotationModel[];
}
