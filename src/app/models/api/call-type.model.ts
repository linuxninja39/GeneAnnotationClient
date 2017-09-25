/**
 * Created by jboswell on 6/7/2017.
 */
import {BaseModel} from './base.model';

export interface CallTypeModel extends BaseModel {
  /*
  VOUS, // = <any>'VOUS',
  LIKELY_PATHOGENIC, //  <any>'Likely pathogenic',
  PATHOGNEIC, //  <any>'Pathogenic',
  BENIGN, //  <any>'Benign',
  AUTOSOMAL //  <any>'autosomal recessive carrier'
  */

  name: string;
}
