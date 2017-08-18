import {Component, OnInit} from '@angular/core';
import {Log} from 'ng2-logger';
import {LiteratureService} from '../../services/literature.service';
import {LiteratureModel} from '../../models/api/literature.model';
import {AnnotationModel} from '../../models/api/annotation.model';
import {AnnotationService} from '../../services/annotation.service';
import {AuthService} from '../../services/auth.service';

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
  displayLiteratureForm = true;

  constructor(private literatureService: LiteratureService,
              private annotationService: AnnotationService,
              private authService: AuthService) {
  }

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
    this.newAnnotation = <AnnotationModel>{
      createdAt: new Date(),
      appUser: this.authService.User
    };
    this.displayNewAnnotationDialog = true;
    log.info('selected thing', this.selectedLiterature);
  }

  saveAnnotation() {
    this.annotationService
      .addLiteratureAnnotation(this.selectedLiterature.id, this.newAnnotation)
      .subscribe(
        (annotation: AnnotationModel) => {
          if (!this.selectedLiterature.annotation) {
            this.selectedLiterature.annotation = [];
          }
          this.selectedLiterature.annotation = [...this.selectedLiterature.annotation, annotation];
          this.displayNewAnnotationDialog = false;
        },
        err => {
          log.error('save literature annotation', err);
        }
      );

  }

  showNewLiteratureDialog() {
    this.displayLiteratureForm = true;
  }

  addToLiterature(lit: LiteratureModel) {
    this.literatures = [...this.literatures, lit];
  }
}
