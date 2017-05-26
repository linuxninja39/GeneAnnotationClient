import {BaseModel} from "./base.model";
import {HumanGenomeModel} from "./human-genome.model";
/**
 * Created by jboswell on 5/24/2017.
 */

export interface ChromosomeModel extends BaseModel {
  name: string;
  hg: HumanGenomeModel;
}
