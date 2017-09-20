import {BaseModel} from './base.model';
import {AnnotationModel} from './annotation.model';
import {GeneVariantLiteratureModel} from './gene-variant-literature.model';
import {VariantTypeModel} from './variant-type.model';
import {ZygosityTypeModel} from './zygosity-type.model';
import {GeneVariantCallTypeModel} from './gene-variant-call-type.model';
import {GeneVariantCallModel} from './gene-variant-call.model';
/**
 * Created by jboswell on 6/1/2017.
 */

export interface GeneVariantModel extends BaseModel {
  zygosityType: ZygosityTypeModel;
  zygosityTypeId?: number | string;
  variantType: VariantTypeModel;
  variantTypeId?: number | string;
  currentCallType?: GeneVariantCallModel;
  callType: GeneVariantCallModel[];
  annotation?: AnnotationModel[];
  geneVariantLiterature?: GeneVariantLiteratureModel[];
  start: number;
  end: number;
}
