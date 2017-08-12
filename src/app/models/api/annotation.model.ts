import {BaseModel} from './base.model';
import {AppUserModel} from './app-user.model';
/**
 * Created by jboswell on 6/1/2017.
 */

export interface AnnotationModel extends BaseModel {
  note: string;
  appUserId?: number | string;
  appUser: AppUserModel;
  createdAt: Date;
  modifiedAt: Date;
}
