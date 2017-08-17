import {BaseModel} from './base.model';
import {strEnum} from '../../StringEnumUtil';
/**
 * Created by jboswell on 5/30/2017.
 */


export const PathogenicSupportCategory = strEnum([
  'Supportive',
  'Unsupportive',
  'Irrelevant',
  'UseWithCaution'
]);

export type PathogenicSupportCategory = keyof typeof PathogenicSupportCategory;

export interface PathogenicSupportCategoryModel extends BaseModel {
  name: PathogenicSupportCategory;
}

