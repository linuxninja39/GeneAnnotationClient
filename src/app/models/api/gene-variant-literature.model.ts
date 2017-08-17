import {BaseModel} from './base.model';
import {GeneVariantModel} from './gene-variant.model';
import {LiteratureModel} from './literature.model';
import {AnnotationModel} from './annotation.model';
import {PathogenicSupportCategoryModel} from './pathogenic-support-category.model';
import {AppUserModel} from './app-user.model';
/**
 * Created by jboswell on 6/1/2017.
 */

export interface GeneVariantLiteratureModel extends BaseModel {
  geneVariantId?: number;
  geneVariant?: GeneVariantModel;
  literature: LiteratureModel;
  literatureId?: number;
  annotation?: AnnotationModel[];
  pathogenicSupportCategory: PathogenicSupportCategoryModel;
  appUser: AppUserModel;
  addedAt: Date;
}
