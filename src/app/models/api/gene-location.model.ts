/**
 * Created by jboswell on 6/7/2017.
 */
import {BaseModel} from './base.model';

export interface GeneLocationModel extends BaseModel{
  chr: string;
  start: number | string;
  end: number | string;
  locus: string;
  hgVersion: number | string;
}

