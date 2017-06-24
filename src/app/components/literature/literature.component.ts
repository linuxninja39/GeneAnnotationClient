import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
import {LiteratureService} from "../../services/literature.service";
import {LiteratureModel} from "../../models/api/literature.model";
import {AnnotationModel} from "../../models/api/annotation.model";
import {TestData} from "../../services/test-data";

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
  displayNewAnnotationDialog = false;
  newAnnotation: AnnotationModel;
  selectedLiterature: LiteratureModel;
  testData = new TestData();

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
    log.info('selected thing', this.selectedLiterature);
    log.info('row selected', event);
  }

  showNewAnnotationDialog(literature: LiteratureModel) {
    this.selectedLiterature = literature;
    this.newAnnotation = <AnnotationModel>{createdAt: new Date(), modifiedAt: new Date(), user: this.testData.users[0]};
    this.displayNewAnnotationDialog = true;
    log.info('selected thing', this.selectedLiterature);
  }

  saveAnnotation() {
    if (!this.selectedLiterature.annotations) {
      this.selectedLiterature.annotations = [];
    }
    this.selectedLiterature.annotations = [...this.selectedLiterature.annotations, this.newAnnotation];
    this.displayNewAnnotationDialog = false;
  }
}
