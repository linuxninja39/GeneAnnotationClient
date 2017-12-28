import {BaseModel} from './base.model';
import {AnnotationModel} from './annotation.model';
import {GeneVariantLiteratureModel} from './gene-variant-literature.model';
import {VariantTypeModel} from './variant-type.model';
import {ZygosityTypeModel} from './zygosity-type.model';
import {CallTypeGeneVariantModel} from './call-type-gene-variant.model';
/**
 * Created by jboswell on 6/1/2017.
 */

export interface GeneVariantModel extends BaseModel {
  zygosityType: ZygosityTypeModel;
  zygosityTypeId?: number | string;
  variantType: VariantTypeModel;
  variantTypeId?: number | string;
  currentCallType?: CallTypeGeneVariantModel;
  callType: CallTypeGeneVariantModel[];
  annotation?: AnnotationModel[];
  geneVariantLiterature?: GeneVariantLiteratureModel[];
  start: number;
  end: number;
}
