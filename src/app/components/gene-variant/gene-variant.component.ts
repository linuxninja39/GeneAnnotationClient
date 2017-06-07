import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GeneService} from "../../services/gene.service";
import {GeneVariantModel} from "../../models/api/gene-variant.model";

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
    private geneService: GeneService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.geneService
          .getGeneVariant(this.id)
          .subscribe(
            (geneVariant: GeneVariantModel) => this.geneVariant = geneVariant
          )
        ;
      }
    );
  }

}
