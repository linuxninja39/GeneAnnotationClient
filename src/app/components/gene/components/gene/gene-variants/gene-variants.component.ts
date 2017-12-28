import {Component, Input, OnInit} from '@angular/core';
import {GeneModel} from '../../../../../models/api/gene.model';
import {Log} from 'ng2-logger';
import {Router} from '@angular/router';
import {GeneVariantModel} from '../../../../../models/api/gene-variant.model';
import {GeneVariantService} from '../../../../../services/gene-variant.service';

const log = Log.create('GeneVariantsComponent');

@Component({
  selector: 'app-gene-variants',
  templateUrl: './gene-variants.component.html',
  styleUrls: ['./gene-variants.component.scss']
})
export class GeneVariantsComponent implements OnInit {
  @Input()
  set gene(gene: GeneModel) {
    if (gene) {
      if (gene.currentGeneLocation) {
        if (gene.currentGeneLocation.start && gene.currentGeneLocation.start) {
          this.spinner = true;
          this.geneVariantService
            .getGeneVariantsByRange(1981908, 211634)
            .subscribe(
              (geneVariants) => {
                log.info('get variants', geneVariants);
                this.spinner = false;
                this.geneVariants = geneVariants;
              }
            )
          ;
        }
      }
    }
  }

  displayNewVariantDialog = false;
  displayCallHistoryDialog = false;
  geneVariants: GeneVariantModel[];
  selectedVariant: GeneVariantModel;
  spinner = true;

  constructor(private geneVariantService: GeneVariantService,
              private router: Router) {
  }

  ngOnInit() {
  }

  showCallHistory(show: boolean, geneVariant: GeneVariantModel) {
    console.log('showCallHistory called', show, geneVariant);
    this.selectedVariant = geneVariant;
    this.displayCallHistoryDialog = show;
  }

  showNewVariantDialog(): void {
    this.displayNewVariantDialog = true;
  }

  onRowSelect(event) {
    this.router.navigate(['/gene-variant', this.selectedVariant.id]);
  }

  updateTable(geneVariant: GeneVariantModel) {
    this.geneVariants = [...this.geneVariants, geneVariant];
  }
}
