/**
 * Created by jboswell on 6/7/2017.
 */
import {BaseModel} from './base.model';
import {ActiveDateBaseModel} from './active-date-base.model';

export interface GeneNameModel extends ActiveDateBaseModel, BaseModel {
  name: string;
}

