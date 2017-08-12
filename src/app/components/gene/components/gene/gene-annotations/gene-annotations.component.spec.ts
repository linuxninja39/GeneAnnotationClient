import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { GeneAnnotationsComponent } from './gene-annotations.component';
import {Component, Input} from '@angular/core';
import {MdCardModule} from '@angular/material';
import {MockDataTableComponent} from '../../../../../test-components/mock-data-table-component.spec';
import {MockColumnComponent} from '../../../../../test-components/mock-column.component.spec';
import {AuthService} from '../../../../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {AnnotationService} from '../../../../../services/annotation.service';
import {HttpModule} from '@angular/http';
import {TestAnnotations} from '../../../../../test-data/test-annotations.spec';
import {Observable} from 'rxjs/Observable';
import {TestGenes} from '../../../../../test-data/test-genes.spec';


@Component( { selector: 'p-footer', template: '' } )
class MockFooterComponent {
}

@Component( { selector: 'p-dialog', template: '' } )
class MockDialogComponent {
  @Input()
  visible;
  @Input()
  responsive;
  @Input()
  modal;
  @Input()
  width;
  @Input()
  height;
}

@Component( { selector: 'p-editor', template: '' } )
class MockEditorComponent {
  @Input()
  ngModel;
  @Input()
  style;
}

describe('GeneAnnotationsComponent', () => {
  let component: GeneAnnotationsComponent;
  let fixture: ComponentFixture<GeneAnnotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [
        GeneAnnotationsComponent,
        MockDataTableComponent,
        MockColumnComponent,
        MockFooterComponent,
        MockDialogComponent,
        MockEditorComponent,
      ],
      providers: [AuthService, CookieService, AnnotationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneAnnotationsComponent);
    component = fixture.componentInstance;
    component.gene = JSON.parse(JSON.stringify(TestGenes[0]));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should call annotation service to save',
    inject(
      [
        AnnotationService
      ],
      (annotationService: AnnotationService) => {
        spyOn(annotationService, 'addGeneAnnotations')
          .and.returnValue(Observable.of(TestAnnotations[0]));

        component.saveAnnotation();

        const newLength = component.gene.annotation.length + 1;
        expect(annotationService.addGeneAnnotations).toHaveBeenCalled();
      }
    )
  );
});
