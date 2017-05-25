import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenesComponent } from './genes.component';
import {DataTableModule, SharedModule} from "primeng/primeng";
import {GeneService} from "./services/gene.service";
import {Http} from "@angular/http";

describe('GenesComponent', () => {
  let component: GenesComponent;
  let fixture: ComponentFixture<GenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GenesComponent
      ],
      imports: [
        DataTableModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
