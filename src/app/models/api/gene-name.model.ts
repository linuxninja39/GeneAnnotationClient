/**
 * Created by jboswell on 6/7/2017.
 */
import {BaseModel} from './base.model';

export interface GeneNameModel extends BaseModel{
  name: string;
  activeDate: Date;
}

