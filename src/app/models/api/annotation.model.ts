import {BaseModel} from "./base.model";
import {UserModel} from "./user.model";
/**
 * Created by jboswell on 6/1/2017.
 */

export interface AnnotationModel extends BaseModel {
  annotation: string;
  user: UserModel;
  createdAt: Date;
  modifiedAt: Date;
}
