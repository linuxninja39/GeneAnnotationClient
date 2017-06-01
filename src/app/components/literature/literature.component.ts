import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
import {LiteratureService} from "../../services/literature.service";
import {LiteratureModel} from "../../models/api/literature.model";

declare const jlinq: any;

const log = Log.create('LiteratureComponent');

@Component({
  selector: 'app-literature',
  templateUrl: './literature.component.html',
  styleUrls: ['./literature.component.scss']
})
export class LiteratureComponent implements OnInit {
  literatures: LiteratureModel[];
  literaturesOrig: LiteratureModel[];

  constructor(
    private literatureService: LiteratureService
  ) { }

  ngOnInit() {
    this.literatureService
      .getLiteratures()
      .subscribe(
        (literatures: LiteratureModel[]) => {
          this.literatures = literatures;
          this.literaturesOrig = literatures;
        }
      )
    ;
  }

  searchGenes(event) {
    const searchTerm = event.target.value;
    log.error('event', event);
    log.error('searchTerm', searchTerm);
    this.literatures = jlinq.from(this.literaturesOrig)
      .match('title', searchTerm)
      .orMatch('url', searchTerm)
      .orMatch('details', searchTerm)
      .select();
  }

  onRowSelect(event) {
    log.info('row selected', event);
  }
}
