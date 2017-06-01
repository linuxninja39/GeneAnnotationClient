import {Component, Input, OnInit} from '@angular/core';
import {GeneModel} from "../../../../../models/api/gene.model";

@Component({
  selector: 'app-gene-details',
  templateUrl: './gene-details.component.html',
  styleUrls: ['./gene-details.component.scss']
})
export class GeneDetailsComponent implements OnInit {
  @Input()
  gene: GeneModel;

  constructor() { }

  ngOnInit() {
  }

}
