import {GeneModel} from "../models/api/gene.model";
import {ChromosomeModel} from "../models/api/chromosome.model";
import {HumanGenomeModel} from "../models/api/human-genome.model";
import {LiteratureModel} from "../models/api/literature.model";
import {AuthorModel} from "../models/api/author.model";
import {
  GeneVariantCallType, GeneVariantModel, GeneVariantType,
  GeneVariantZygosityType
} from "../models/api/gene-variant.model";
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

  geneVariants: GeneVariantModel[] = [
    {
      id: "1",
      zygosity: GeneVariantZygosityType.COMPOUND,
      type: GeneVariantType.DELETION_WHOLE_GENE,
      call: GeneVariantCallType.AUTOSOMAL,
      annotations: [
        {
          id: "1",
          annotation: "cool stuff man"
        }
      ]
    },
    {
      id: "2",
      zygosity: GeneVariantZygosityType.HETORZYGOUS,
      type: GeneVariantType.DELETION_WHOLE_GENE,
      call: GeneVariantCallType.AUTOSOMAL,
      annotations: [
        {
          id: "1",
          annotation: "cool stuff man"
        }
      ]
    },
    {
      id: "3",
      zygosity: GeneVariantZygosityType.HETORZYGOUS,
      type: GeneVariantType.GWAS,
      annotations: [
        {
          id: "2",
          annotation: "entre nous"
        }
      ]
    }
  ];

  genes: GeneModel[] = [
    {
      "id": "1",
      "symbol": "SLC3A1",
      name: "alpha-1-B glycoprotein",
      locus: "2p21",
      "geneNameExpansion": "alpha-1-B glycoprotein",
      "start": 119187504,
      "end": 120177317,
      "hg": this.hg,
      "chromosome": this.chromosomes[0],
      knownGeneFunction: 'This gene encodes a thioredoxin-binding protein that is a member of the alpha arrestin protein family. Thioredoxin is a thiol-oxidoreductase that is a major regulator of cellular redox signaling which protects cells from oxidative stress. This protein inhibits the antioxidative function of thioredoxin resulting in the accumulation of reactive oxygen species and cellular stress. This protein also functions as a regulator of cellular metabolism and of endoplasmic reticulum (ER) stress. This protein may also function as a tumor suppressor. Alternate splicing results in multiple transcript variants. [provided by RefSeq, Sep 2015].',
      origin: 'Index gene',
      previousSymobls: ['1001001001', '2112'],
      previousNames: ['Cygnus', 'working man'],
      variants: [
        this.geneVariants[0]
      ]
    },
    {
      "id": "2",
      "symbol": "A1CF",
      name: "APOBEC1 complementation factor",
      locus: "2p21",
      "geneNameExpansion": "Astrotactin 2",
      "start": 119187504,
      "end": 120177317,
      "hg": this.hg,
      "chromosome": this.chromosomes[0],
      knownGeneFunction: 'This gene encodes a thioredoxin-binding protein that is a member of the alpha arrestin protein family. Thioredoxin is a thiol-oxidoreductase that is a major regulator of cellular redox signaling which protects cells from oxidative stress. This protein inhibits the antioxidative function of thioredoxin resulting in the accumulation of reactive oxygen species and cellular stress. This protein also functions as a regulator of cellular metabolism and of endoplasmic reticulum (ER) stress. This protein may also function as a tumor suppressor. Alternate splicing results in multiple transcript variants. [provided by RefSeq, Sep 2015].',
      origin: 'Index gene',
      previousSymobls: ['1001001001', '2112'],
      previousNames: ['Cygnus', 'working man']
    },
    {
      "id": "3",
      "symbol": "SLDKF3",
      name: "so lit dang k",
      locus: "2p21",
      "geneNameExpansion": "protein tyrosine phosphatase, receptor type D",
      "start": 119187504,
      "end": 120177317,
      "hg": this.hg,
      "chromosome": this.chromosomes[0],
      knownGeneFunction: 'This gene encodes a thioredoxin-binding protein that is a member of the alpha arrestin protein family. Thioredoxin is a thiol-oxidoreductase that is a major regulator of cellular redox signaling which protects cells from oxidative stress. This protein inhibits the antioxidative function of thioredoxin resulting in the accumulation of reactive oxygen species and cellular stress. This protein also functions as a regulator of cellular metabolism and of endoplasmic reticulum (ER) stress. This protein may also function as a tumor suppressor. Alternate splicing results in multiple transcript variants. [provided by RefSeq, Sep 2015].',
      origin: 'Index gene',
      previousSymobls: ['1001001001', '2112'],
      previousNames: ['Cygnus', 'working man']
    },
  ];

  authors: AuthorModel[] = [
    {
      id: "1",
      name: "Bob"
    }
  ];

  literatures: LiteratureModel[] = [
    {
      id: "1",
      title: "This cool article",
      url: new URL("https://www.ncbi.nlm.nih.gov/pubmed/24610330"),
      details: "cool details",
      author: this.authors[0]
    },
    {
      id: "2",
      title: "Another cool article",
      url: new URL("https://www.ncbi.nlm.nih.gov/pubmed/24610331"),
      details: "more details",
      author: this.authors[0]
    },
    {
      id: "3",
      title: "Lit fam",
      url: new URL("https://www.ncbi.nlm.nih.gov/pubmed/34610331"),
      details: "totz lit",
      author: this.authors[0]
    }
  ];


}
