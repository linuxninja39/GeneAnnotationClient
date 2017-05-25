import { Component, OnInit } from '@angular/core';
import {GeneModel} from "../../models/api/gene.model";
import {GeneService} from "./services/gene.service";

@Component({
  selector: 'app-genes',
  templateUrl: './genes.component.html',
  styleUrls: ['./genes.component.scss']
})
export class GenesComponent implements OnInit {
  genes: GeneModel[];

  constructor(private geneService: GeneService) { }

  ngOnInit() {
    this.geneService
      .getGenes()
      .subscribe(
        (genes: GeneModel[]) => {
          this.genes = genes;
        }
      )
    ;
  }
}
