import {Component, Input, OnInit} from '@angular/core';
import {GeneModel} from "../../../../../models/api/gene.model";

@Component({
  selector: 'app-gene-notes',
  templateUrl: './gene-notes.component.html',
  styleUrls: ['./gene-notes.component.scss']
})
export class GeneNotesComponent implements OnInit {
  @Input()
  gene: GeneModel;

  constructor() { }

  ngOnInit() {
  }

}
