import {BaseModel} from "./base.model";
import {GeneModel} from "./gene.model";
import {AnnotationModel} from "./annotation.model";
import {GeneVariantLiteratureModel} from "./gene-variant-literature.model";
/**
 * Created by jboswell on 6/1/2017.
 */


export enum GeneVariantType {
  DELETION_WHOLE_GENE = <any>'Deletion (whole gene)',
  PARTIAL_DELETION_INTRAGENIC = <any>'Partial Deletion (intragenic)',
  PARTIAL_DELETION_DELETED_5 = <any>'Partial Deletion (deleted 5\')',
  PARTIAL_DELETION_DELETED_3 = <any>'Partial Deletion (deleted 3\')',
  DUPLICATION_WHOLE_GENE = <any>'Duplication (whole gene)',
  PARTIAL_DUPLICATION_INTRAGENIC = <any>'Partial Duplication (intragenic)',
  PARTIAL_DUPLICATION_DUPLICATED_5 = <any>'Partial Duplication (duplicated 5\')',
  PARTIAL_DUPLICATION_DUPLICATED_3 = <any>'Partial Duplication (duplicated 3\')',
  SNV_PREDICTED_LOF = <any>'SNV, predicted lof',
  SNV_PREDICTED_GOF = <any>'SNV, predicted gof',
  SPLICE_SITE = <any>'Splice site',
  GWAS = <any>'GWAS (within gene or nearest to this gene)'
}

export enum GeneVariantZygosityType {
  HETORZYGOUS = <any>'Hetorzygous',
  HOMOZYGOUS = <any>'Homozygous',
  COMPOUND = <any>'Compound Heterozygous'
}

export enum GeneVariantCallType {
  VOUS_ = <any>'VOUS',
  LIKELY_PATHOGENIC = <any>'Likely pathogenic',
  PATHOGNEIC = <any>'Pathogenic',
  BENIGN = <any>'Benign',
  AUTOSOMAL = <any>'autosomal recessive carrier'
}

export interface GeneVariantModel extends BaseModel {
  zygosity: GeneVariantZygosityType;
  type: GeneVariantType;
  call?: GeneVariantCallType;
  annotations?: AnnotationModel[];
  literature?: GeneVariantLiteratureModel[];
}
