import {BaseModel} from "./base.model";
import {ChromosomeModel} from "./chromosome.model";
/**
 * Created by jboswell on 5/24/2017.
 */

export interface GeneModel extends BaseModel{
  symbol: string;
  hgncId: string;
  geneNameExpansion?: string;
  knownGeneFunction?: string;
  lastModifiedDate?: Date;
  chromosome: ChromosomeModel;
}
