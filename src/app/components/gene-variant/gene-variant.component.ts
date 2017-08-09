import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GeneService} from '../../services/gene.service';
import {GeneVariantModel} from '../../models/api/gene-variant.model';
import {GeneVariantService} from '../../services/gene-variant.service';
import {GeneModel} from '../../models/api/gene.model';

@Component({
  selector: 'app-gene-variant',
  templateUrl: './gene-variant.component.html',
  styleUrls: ['./gene-variant.component.scss']
})
export class GeneVariantComponent implements OnInit {
  id: string;
  geneVariant: GeneVariantModel;
  gene: GeneModel;

  constructor(
    private activeRoute: ActivatedRoute,
    private geneVariantService: GeneVariantService,
  private geneService: GeneService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.geneVariantService
          .getGeneVariant(this.id)
          .subscribe(
            (geneVariant: GeneVariantModel) => {
              this.geneVariant = geneVariant;
              this.geneService
                .getGene(geneVariant.geneId)
                .subscribe(
                  gene => this.gene = gene
                );
            }
          )
        ;
      }
    );
  }

}
