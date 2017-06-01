import {BaseModel} from "./base.model";
import {ChromosomeModel} from "./chromosome.model";
import {HumanGenomeModel} from "./human-genome.model";
/**
 * Created by jboswell on 5/24/2017.
 */

export interface GeneModel extends BaseModel{
  symbol: string;
  previousSymobls?: string[];
  hg: HumanGenomeModel;
  chromosome: ChromosomeModel;
  name: string;
  previousNames?: string[];
  synonyms?: string[];
  lastModifiedDate?: Date;
  geneNameExpansion?: string;
  knownGeneFunction?: string;
  locus: string;
  start: number;
  end: number;
  origin?: string;
}
