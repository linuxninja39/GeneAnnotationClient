import {BaseModel} from './base.model';
import {ChromosomeModel} from './chromosome.model';
import {GeneVariantModel} from './gene-variant.model';
import {AnnotationModel} from './annotation.model';
import {SymbolModel} from './symbol.model';
import {GeneNameModel} from './gene-name.model';
import {SynonymModel} from './synonym.model';
import {GeneLocationModel} from './gene-location.model';
import {OriginTypeModel} from './origin-type.model';
/**
 * Created by jboswell on 5/24/2017.
 */

export interface GeneModel extends BaseModel {
  symbol: SymbolModel[];
  chromosome: ChromosomeModel;
  geneName: GeneNameModel[];
  synonym?: SynonymModel[];
  lastModifiedDate?: Date;
  geneNameExpansion?: string;
  knownGeneFunction?: string;
  geneLocation: GeneLocationModel[];
  origin: OriginTypeModel[];
  geneVariant?: GeneVariantModel[];
  annotation?: AnnotationModel[];
}
