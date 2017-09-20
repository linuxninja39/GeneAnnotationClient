import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GeneModel} from '../../../../../models/api/gene.model';
import { Log } from 'ng2-logger';
import {Router} from '@angular/router';
import {SelectItem} from 'primeng/primeng';
import {GeneVariantModel} from '../../../../../models/api/gene-variant.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeneVariantService} from '../../../../../services/gene-variant.service';
import {AuthService} from '../../../../../services/auth.service';

const log = Log.create('GeneVariantsComponent');

@Component({
  selector: 'app-gene-variants',
  templateUrl: './gene-variants.component.html',
  styleUrls: ['./gene-variants.component.scss']
})
export class GeneVariantsComponent implements OnInit {
  @Input()
  gene: GeneModel;
  displayNewVariantDialog = false;
  displayCallHistoryDialog = false;
  selectedVariant: GeneVariantModel;

  newVariantForm: FormGroup;
  constructor(
    private router: Router,
  ) { }

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

  updateTable() {}
}
