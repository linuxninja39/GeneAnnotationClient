import {BaseModel} from './base.model';
import {GeneModel} from './gene.model';
import {AnnotationModel} from './annotation.model';
import {GeneVariantLiteratureModel} from './gene-variant-literature.model';
import {VariantTypeModel} from './variant-type.model';
import {ZygosityTypeModel} from './zygosity-type.model';
import {GeneVariantCallTypeModel} from './gene-variant-call-type.model';
/**
 * Created by jboswell on 6/1/2017.
 */

export interface GeneVariantModel extends BaseModel {
  gene: GeneModel;
  zygosityType: ZygosityTypeModel;
  variantType: VariantTypeModel;
  callType: GeneVariantCallTypeModel;
  annotation?: AnnotationModel[];
  literature?: GeneVariantLiteratureModel[];
}
