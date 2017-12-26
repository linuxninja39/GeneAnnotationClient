import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GeneModel} from '../../models/api/gene.model';
import {GeneService} from '../../services/gene.service';
import { Log } from 'ng2-logger';
import {Router} from '@angular/router';
import {OverlayPanel} from 'primeng/primeng';
import {environment} from '../../../environments/environment';
import {TestGenes} from '../../test-data/test-genes.spec';

const log = Log.create('GenesComponent');

declare const jlinq: any;

@Component({
  selector: 'app-genes',
  templateUrl: './genes.component.html',
  styleUrls: ['./genes.component.scss']
})
export class GenesComponent implements OnInit {
  genesOrig: GeneModel[];
  genes: GeneModel[];
  selectedGene: GeneModel;
  @ViewChild('knownFunctionPanel')
  knownFunctionPanel: ElementRef;
  spinner = true;

  totalGenes: number;

  constructor(private geneService: GeneService, private router: Router) { }

  ngOnInit() {

  }

  searchGenes(event) {
    const searchTerm = event.target.value;
    log.info('event', event);
    log.info('searchTerm', searchTerm);
    this.genes = jlinq.from(this.genesOrig)
      .match('symbol', searchTerm)
      .orMatch('hgncId', searchTerm)
      .orMatch('geneNameExpansion', searchTerm)
      .select();
  }

  onRowSelect(event) {
    log.error('row selected', event);
    this.router.navigate(['/gene', this.selectedGene.id]);
  }

  handleKnowFunctionClick(e, gene: GeneModel, overlayPanel: OverlayPanel) {
    this.selectedGene = gene;
    overlayPanel.toggle(e);
  }

  loadData(event) {
    this.spinner = true;
    log.info('data load', event);
        this.geneService
      .getGenes(
        {
          pageStart: event.first,
          pageCount: event.rows,
          globalFilter: event.globalFilter
        }
      )
      .subscribe(
        (genes: GeneModel[]) => {
          this.totalGenes = this.geneService.queryCount;
          this.genes = genes;
          this.genesOrig = genes;
          this.spinner = false;
        },
        (error) => {
          log.error('got error trying to get genes', error);
          this.spinner = false;
          if (!environment.production) {
            this.genes = TestGenes;
          }
        }
      )
    ;
  }
}
