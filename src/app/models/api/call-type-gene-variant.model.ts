import {BaseModel} from './base.model';
import {GeneVariantModel} from './gene-variant.model';
import {CallTypeModel} from './call-type.model';
import {AppUserModel} from './app-user.model';
import {ActiveDateBaseModel} from './active-date-base.model';
/**
 * Created by jboswell on 5/30/2017.
 */

export interface CallTypeGeneVariantModel extends BaseModel, ActiveDateBaseModel {
  geneVariant?: GeneVariantModel;
  geneVariantId?: string | number;
  callType?: CallTypeModel;
  callTypeId?: string | number;
  createdBy: AppUserModel;
}
