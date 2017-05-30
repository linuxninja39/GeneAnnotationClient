import {BaseModel} from "./base.model";
import {AuthorModel} from "./author.model";
/**
 * Created by jboswell on 5/30/2017.
 */

export interface Literature extends BaseModel {
  title: string;
  url: URL;
  details: string;
  author: AuthorModel
}
