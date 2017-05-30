import {BaseModel} from "./base.model";
import {ChromosomeModel} from "./chromosome.model";
import {HumanGenomeModel} from "./human-genome.model";
/**
 * Created by jboswell on 5/24/2017.
 */

export interface GeneModel extends BaseModel{
  symbol: string;
  hgncId: string;
  hg: HumanGenomeModel;
  geneNameExpansion?: string;
  knownGeneFunction?: string;
  lastModifiedDate?: Date;
  chromosome: ChromosomeModel;
  start: number;
  end: number;
}
