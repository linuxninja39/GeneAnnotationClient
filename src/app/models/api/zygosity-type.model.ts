/**
 * Created by jboswell on 6/7/2017.
 */
import {BaseModel} from './base.model';

export interface ZygosityTypeModel extends BaseModel {
  /*
  HETORZYGOUS, // = <any>'Hetorzygous',
  HOMOZYGOUS, // = <any>'Homozygous',
  COMPOUND // = <any>'Compound Heterozygous'
  */
  name: string;
}

