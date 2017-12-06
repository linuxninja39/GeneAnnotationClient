import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneDetailsComponent } from './gene-details.component';
import {MdCardModule} from '@angular/material';
import {TestGenes} from '../../../../../test-data/test-genes.spec';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {element} from 'protractor';

describe('GeneDetailsComponent', () => {
  let component: GeneDetailsComponent;
  let fixture: ComponentFixture<GeneDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneDetailsComponent ],
      imports: [
        MdCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneDetailsComponent);
    component = fixture.componentInstance;
    component.gene = TestGenes[0];
    component.gene.currentSymbol = {id: 1, name: 'Cool Symbol', activeDate: new Date()};
    component.gene.currentGeneLocation = {id: 1, start: 1, end: 2, locus: 'bla', hgVersion: 1, chr: 'chr'};
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it (
    'should have the right data in elements',
    () => {
      const elementMap = new Map<string, string | number>();
      elementMap.set('.symbolEl', TestGenes[0].currentSymbol.name);
      elementMap.set('.chromosomeNameEl', TestGenes[0].chromosome.name);
      elementMap.set('.startEl', TestGenes[0].currentGeneLocation.start);
      elementMap.set('.endEl', TestGenes[0].currentGeneLocation.end);
      elementMap.set('.locusEl', TestGenes[0].currentGeneLocation.locus);
      elementMap.set('.nameExpansionEl', TestGenes[0].geneNameExpansion);
      elementMap.set('.knownFunctionEl', TestGenes[0].knownFunction);
      fixture.detectChanges();
      elementMap.forEach(
        (elementContent, elementClassName) => {
          const el = fixture.debugElement.query(By.css(elementClassName));
          expect(el.nativeElement.textContent).toContain(elementContent);
        }
      );
    }
  );

});
