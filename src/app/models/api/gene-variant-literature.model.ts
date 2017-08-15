import {BaseModel} from './base.model';
import {GeneVariantModel} from './gene-variant.model';
import {LiteratureModel} from './literature.model';
import {AnnotationModel} from './annotation.model';
/**
 * Created by jboswell on 6/1/2017.
 */

export interface GeneVariantLiteratureModel extends BaseModel {
  geneVariantId?: number;
  geneVariant: GeneVariantModel;
  literature: LiteratureModel;
  literatureId?: number;
  annotation?: AnnotationModel[];
}
