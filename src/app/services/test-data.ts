import {GeneModel} from "../models/api/gene.model";
import {ChromosomeModel} from "../models/api/chromosome.model";
import {HumanGenomeModel} from "../models/api/human-genome.model";
/**
 * Created by jboswell on 5/30/2017.
 */

export class TestData {
  hg: HumanGenomeModel = {
    id: "1",
    build: 19
  };
  chromosomes: ChromosomeModel[] = [
    {
      id: "1",
      name: "1"
    }
  ];
  genes: GeneModel[] = [
    {
      "id": "1",
      "symbol": "ASTN2",
      "geneNameExpansion": "alpha-1-B glycoprotein",
      "start": 119187504,
      "end": 120177317,
      "hgncId": "hg19",
      "hg": this.hg,
      "chromosome": this.chromosomes[0]
    },
    {
      "id": "2",
      "symbol": "SLC3A1",
      "geneNameExpansion": "alpha-1-B glycoprotein",
      "start": 44502597,
      "end": 44547962,
      "hgncId": "hg19",
      "hg": this.hg,
      "chromosome": this.chromosomes[0]
    },
        {
      "id": "3",
      "symbol": "TXNIP",
      "geneNameExpansion": "thioredoxin interacting protein",
      "start": 145438462,
      "end": 145442628,
      "hgncId": "hg19",
      "hg": this.hg,
      "chromosome": this.chromosomes[0]
    },
  ]
}
