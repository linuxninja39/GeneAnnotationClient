import {BaseModel} from "./base.model";
import {GeneModel} from "./gene.model";
import {AnnotationModel} from "./annotation.model";
import {GeneVariantLiteratureModel} from "./gene-variant-literature.model";
import {GeneVariantType} from "./types/gene-variant.type";
import {GeneVariantZygosityType} from "./types/gene-variant-zygosity.type";
import {GeneVariantCallType} from "./types/gene-variant-call.type";
/**
 * Created by jboswell on 6/1/2017.
 */

export interface GeneVariantModel extends BaseModel {
  gene: GeneModel;
  zygosity: GeneVariantZygosityType;
  type: GeneVariantType;
  call?: GeneVariantCallType;
  annotations?: AnnotationModel[];
  literatures?: GeneVariantLiteratureModel[];
}
