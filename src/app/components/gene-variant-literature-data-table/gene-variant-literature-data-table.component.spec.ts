import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneVariantLiteratureDataTableComponent } from './gene-variant-literature-data-table.component';
import {DataTableModule, DialogModule, ListboxModule} from 'primeng/primeng';
import {TruncateWordsPipe} from 'ng2-truncate/dist/truncate-words.pipe';
import {MdCardModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {EditorModule} from 'primeng/components/editor/editor';
import {LiteratureService} from '../../services/literature.service';
import {SymbolModel} from '../../models/api/symbol.model';
import {GeneModel} from '../../models/api/gene.model';
import {ZygosityTypeModel} from '../../models/api/zygosity-type.model';
import {VariantTypeModel} from '../../models/api/variant-type.model';
import {GeneVariantCallTypeModel} from '../../models/api/gene-variant-call-type.model';

describe('GeneVariantLiteratureDataTableComponent', () => {
  let component: GeneVariantLiteratureDataTableComponent;
  let fixture: ComponentFixture<GeneVariantLiteratureDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneVariantLiteratureDataTableComponent,
        TruncateWordsPipe
      ],
      imports: [
        DataTableModule,
        MdCardModule,
        DialogModule,
        FormsModule,
        EditorModule,
        ListboxModule,
      ],
      providers: [
        LiteratureService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    /*
    fixture = TestBed.createComponent(GeneVariantLiteratureDataTableComponent);
    component = fixture.componentInstance;
    component.geneVariant = {
      id: '1',
      gene: <GeneModel>{
        id: '1',
        symbol: [],
        chromosome: {name: '1'},
        geneName: [],
        geneLocation: [],
        origin: []
      },
      zygosityType: <ZygosityTypeModel>{},
      variantType: <VariantTypeModel>{},
      callType: <GeneVariantCallTypeModel>{}
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    // expect(component).toBeTruthy();
    */
  });
});
