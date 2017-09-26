import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Log} from 'ng2-logger';
import {LiteratureService} from '../../services/literature.service';
import {LiteratureModel} from '../../models/api/literature.model';

const log = Log.create('LiteratureFormDialogComponent');

@Component({
  selector: 'app-literature-form-dialog',
  templateUrl: './literature-form-dialog.component.html',
  styleUrls: ['./literature-form-dialog.component.scss']
})
export class LiteratureFormDialogComponent implements OnInit {
  private _display = false;

  literatureFormGroup: FormGroup;

  @Input()
  set display(d: boolean) {
    this.displayChange.emit(d);
    this._display = d;
  }

  get display(): boolean {
    return this._display;
  }

  @Output()
  displayChange = new EventEmitter<boolean>();

  @Output()
  literatureSaved = new EventEmitter<LiteratureModel>();

  get authorFormArray(): FormArray {
    return this.literatureFormGroup.get('author') as FormArray;
  }

  get annotationFormArray(): FormArray {
    return this.literatureFormGroup.get('annotation') as FormArray;
  }

  get controls() {
    return this.literatureFormGroup.controls;
  }

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private literatureService: LiteratureService) {
  }

  ngOnInit() {
    this.initFormGroup();
    log.info('authorFormArray.controls', this.authorFormArray.controls);
  }

  initFormGroup() {
//    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    this.literatureFormGroup = this.formBuilder.group(
      {
        title: ['', Validators.required],
//        url: ['', [Validators.required, Validators.pattern(urlRegex)]],
        url: ['', [Validators.required]],
        pubMedId: '',
        abstract: '',
        author: this.formBuilder.array(
          [
            this.formBuilder.group({
              name: ['', Validators.required]
            })
          ]
        ),
        annotation: this.formBuilder.array(
          []
        )
      }
    );
  }

  addAnnotation() {
    (<FormArray>this.literatureFormGroup.get('annotation')).controls.push(
      this.formBuilder.group(
        {
          note: ['', Validators.required],
          appUser: this.authService.User,
          createdAt: new Date()
        }
      )
    );
  }

  saveLiterature() {
    if (!this.literatureFormGroup.valid) {
      log.error('form not valid');
      return;
    }
    log.error('yay form valid');
    this.display = false;

    const newLit: LiteratureModel = this.literatureFormGroup.value;
    this.literatureService
      .saveLiterature(newLit)
      .subscribe(
        (lit: LiteratureModel) => {
          log.info('saved literature', lit);
          this.literatureSaved.emit(lit);
        }
      )
    ;
  }
}
