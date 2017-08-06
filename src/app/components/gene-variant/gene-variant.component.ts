import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GeneService} from '../../services/gene.service';
import {GeneVariantModel} from '../../models/api/gene-variant.model';
import {GeneVariantService} from '../../services/gene-variant.service';

@Component({
  selector: 'app-gene-variant',
  templateUrl: './gene-variant.component.html',
  styleUrls: ['./gene-variant.component.scss']
})
export class GeneVariantComponent implements OnInit {
  id: string;
  geneVariant: GeneVariantModel;

  constructor(
    private activeRoute: ActivatedRoute,
    private geneVariantService: GeneVariantService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.geneVariantService
          .getGeneVariant(this.id)
          .subscribe(
            (geneVariant: GeneVariantModel) => this.geneVariant = geneVariant
          )
        ;
      }
    );
  }

}
