import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { GeneVariantAnnotationsComponent } from './gene-variant-annotations.component';
import {DataTableModule, DialogModule, EditorModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AnnotationService} from '../../../services/annotation.service';
import {HttpModule} from '@angular/http';
import {TestAnnotations} from '../../../test-data/test-annotations.spec';
import {TestGeneVariants} from '../../../test-data/test-gene-variants.spec';
import {Observable} from 'rxjs/Observable';

describe('GeneVariantAnnotationsComponent', () => {
  let component: GeneVariantAnnotationsComponent;
  let fixture: ComponentFixture<GeneVariantAnnotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DataTableModule,
        DialogModule,
        EditorModule,
        FormsModule,
        NoopAnimationsModule,
        HttpModule
      ],
      declarations: [ GeneVariantAnnotationsComponent ],
      providers: [AnnotationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneVariantAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'saveAnnotation should call AnnotationService.addGeneVariantAnnotation',
    inject(
      [
        AnnotationService
      ],
      (service: AnnotationService) => {
        const data = JSON.parse(JSON.stringify(TestAnnotations[0]));
        spyOn(service, 'addGeneVariantAnnotation')
          .and.returnValue(Observable.of(data));

        component.geneVariant = JSON.parse(JSON.stringify(TestGeneVariants[0]));

        component.newAnnotation = data;
        component.saveAnnotation();

        expect(service.addGeneVariantAnnotation).toHaveBeenCalledWith(component.geneVariant.id, data)
      }
    )
  );
});
