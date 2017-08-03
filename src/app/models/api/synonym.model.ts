/**
 * Created by jboswell on 6/7/2017.
 */
import {ActiveDateBaseModel} from './active-date-base.model';
import {BaseModel} from './base.model';

export interface SynonymModel extends ActiveDateBaseModel, BaseModel{
  name: string;
}

