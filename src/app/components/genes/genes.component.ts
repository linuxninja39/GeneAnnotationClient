import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GeneModel} from "../../models/api/gene.model";
import {GeneService} from "./services/gene.service";
import { Log } from 'ng2-logger';

const log = Log.create('GeneService');

declare const jlinq: any;

@Component({
  selector: 'app-genes',
  templateUrl: './genes.component.html',
  styleUrls: ['./genes.component.scss']
})
export class GenesComponent implements OnInit {
  genesOrig: GeneModel[];
  genes: GeneModel[];

  constructor(private geneService: GeneService) { }

  ngOnInit() {
    this.geneService
      .getGenes()
      .subscribe(
        (genes: GeneModel[]) => {
          this.genes = genes;
          this.genesOrig = genes;
        }
      )
    ;
  }

  searchGenes(event) {
    const searchTerm = event.target.value;
    log.error('event', event);
    log.error('searchTerm', searchTerm);
    this.genes = jlinq.from(this.genesOrig)
      .match('symbol', searchTerm)
      .orMatch('hgncId', searchTerm)
      .orMatch('geneNameExpansion', searchTerm)
      .select();
  }
}
