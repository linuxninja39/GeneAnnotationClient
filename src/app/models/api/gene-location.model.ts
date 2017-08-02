/**
 * Created by jboswell on 6/7/2017.
 */
import {BaseModel} from './base.model';

export interface GeneLocationModel extends BaseModel{
  chr: string;
  start: number;
  end: number;
  locus: string;
  hgVersion: number;
}

