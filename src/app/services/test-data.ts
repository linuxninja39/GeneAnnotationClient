import {GeneModel} from "../models/api/gene.model";
import {ChromosomeModel} from "../models/api/chromosome.model";
import {HumanGenomeModel} from "../models/api/human-genome.model";
import {LiteratureModel} from "../models/api/literature.model";
import {AuthorModel} from "../models/api/author.model";
import { GeneVariantModel } from "../models/api/gene-variant.model";
import {UserModel} from "../models/api/user.model";
import {GeneVariantZygosityType} from "../models/api/types/gene-variant-zygosity.type";
import {GeneVariantType} from "../models/api/types/gene-variant.type";
import {GeneVariantCallType} from "../models/api/types/gene-variant-call.type";
import {GeneVariantLiteratureModel} from "../models/api/gene-variant-literature.model";
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

  users: UserModel[] = [
    {
      id: '1',
      name: 'bob'
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
      previousNames: ['Cygnus', 'working man']
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

  geneVariants: GeneVariantModel[] = [
    {
      id: "1",
      gene: this.genes[0],
      zygosity: GeneVariantZygosityType.COMPOUND,
      type: GeneVariantType.GWAS,
      call: GeneVariantCallType.AUTOSOMAL,
      annotations: [
        {
          id: "1",
          annotation: "cool stuff man",
          user: this.users[0],
          createdAt: new Date(),
          modifiedAt: new Date()
        },
        {
          id: "2",
          annotation: "another interesting thing",
          user: this.users[0],
          createdAt: new Date(),
          modifiedAt: new Date()
        }
      ]
    },
    {
      id: "2",
      gene: this.genes[2],
      zygosity: GeneVariantZygosityType.HETORZYGOUS,
      type: GeneVariantType.DELETION_WHOLE_GENE,
      call: GeneVariantCallType.AUTOSOMAL,
      annotations: [
        {
          id: "1",
          annotation: "cool stuff man",
          user: this.users[0],
          createdAt: new Date(),
          modifiedAt: new Date()
        },
        {
          id: "2",
          annotation: "another interesting thing",
          user: this.users[0],
          createdAt: new Date(),
          modifiedAt: new Date()
        }
      ]
    },
    {
      id: "3",
      gene: this.genes[3],
      zygosity: GeneVariantZygosityType.HETORZYGOUS,
      type: GeneVariantType.GWAS,
      annotations: [
        {
          id: "2",
          annotation: "entre nous",
          user: this.users[0],
          createdAt: new Date(),
          modifiedAt: new Date()
        },
        {
          id: "2",
          annotation: "another interesting thing",
          user: this.users[0],
          createdAt: new Date(),
          modifiedAt: new Date()
        }
      ]
    }
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

  geneVariantLiteratures: GeneVariantLiteratureModel[] = [
    {
      id: "1",
      geneVariant: this.geneVariants[0],
      literature: this.literatures[0],
      annotations: [
        {
          id: "gva1",
          annotation: "this lit doesn't apply",
          user: this.users[0],
          createdAt: new Date(),
          modifiedAt: new Date()
        },
        {
          id: "gva2",
          annotation: "this lit applies",
          user: this.users[0],
          createdAt: new Date(),
          modifiedAt: new Date()
        }
      ]
    }
  ];

  constructor() {
    this.geneVariants[0].literatures = [this.geneVariantLiteratures[0]];

    this.genes[0].variants = [this.geneVariants[0]];
    this.genes[1].variants = [this.geneVariants[1]];
    this.genes[2].variants = [this.geneVariants[2]];
  }

}
