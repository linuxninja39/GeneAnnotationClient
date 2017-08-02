import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteratureComponent } from './literature.component';
import {DataTableModule, DialogModule, EditorModule} from 'primeng/primeng';
import {MdCardModule} from '@angular/material';
import {MockEditorComponent} from '../../test-components/mock-editor.spec';
import {LiteratureService} from '../../services/literature.service';

class MockLiteratureService {
  getLiteratures() {}
}

describe('LiteratureComponent', () => {
  let component: LiteratureComponent;
  let fixture: ComponentFixture<LiteratureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LiteratureComponent,
        MockEditorComponent
      ],
      imports: [
        DataTableModule,
        MdCardModule,
        DialogModule,
      ],
      providers: [
        {
          provide: LiteratureService,
          useClass: MockLiteratureService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
