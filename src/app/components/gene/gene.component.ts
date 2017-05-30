import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GeneService} from "../../services/gene.service";
import {GeneModel} from "../../models/api/gene.model";

@Component({
  selector: 'app-gene',
  templateUrl: './gene.component.html',
  styleUrls: ['./gene.component.scss']
})
export class GeneComponent implements OnInit {
  id: string;
  gene: GeneModel;

  constructor(
    private activeRoute: ActivatedRoute,
    private geneService: GeneService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.geneService
        .getGene(this.id)
        .subscribe(
          (gene: GeneModel) => this.gene = gene
        )
      ;
    });
  }

}
