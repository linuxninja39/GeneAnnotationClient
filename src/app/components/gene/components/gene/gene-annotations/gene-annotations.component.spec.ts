import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { GeneAnnotationsComponent } from './gene-annotations.component';
import {AuthService} from '../../../../../services/auth.service';
import {CookieService} from 'ng2-cookies';
import {AnnotationService} from '../../../../../services/annotation.service';
import {HttpModule} from '@angular/http';
import {TestAnnotations} from '../../../../../test-data/test-annotations.spec';
import {Observable} from 'rxjs/Observable';
import {TestGenes} from '../../../../../test-data/test-genes.spec';
import {By} from '@angular/platform-browser';
import {DataTableModule, DialogModule, EditorModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('GeneAnnotationsComponent', () => {
  let component: GeneAnnotationsComponent;
  let fixture: ComponentFixture<GeneAnnotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        DataTableModule,
        DialogModule,
        FormsModule,
        EditorModule,
        NoopAnimationsModule
      ],
      declarations: [
        GeneAnnotationsComponent,
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

  it(
    'should have the right content in table',
    () => {
      const dataTableElement = fixture.debugElement.query(By.css('tbody'));
      const children = dataTableElement.children;
      expect(children.length)
        .toBe(
          TestGenes[0].annotation.length,
          'table should have same number of children as there are in gene.annotation'
        );

      const cells = children[0].query(By.css('td'));
      const innerText = cells.nativeElement.innerText;
      expect(innerText).toBe(TestGenes[0].annotation[0].appUser.name);
    }
  );
});
