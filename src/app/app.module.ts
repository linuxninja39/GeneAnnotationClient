import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  AccordionModule, ButtonModule, DataTableModule, DialogModule, DropdownModule, InputTextModule, OverlayPanelModule,
  PanelModule,
  SharedModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./components/home/home.component";
import { Error404Component } from './components/error-404/error-404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GenesComponent } from './components/genes/genes.component';
import {GeneService} from "./services/gene.service";
import { GeneComponent } from './components/gene/gene.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdCardModule} from "@angular/material";
import { LiteratureComponent } from './components/literature/literature.component';
import {LiteratureService} from "./services/literature.service";
import { TruncateModule } from 'ng2-truncate';
import { GeneDetailsComponent } from './components/gene/components/gene/gene-details/gene-details.component';
import { GeneVariantsComponent } from './components/gene/components/gene/gene-variants/gene-variants.component';
import { GeneNotesComponent } from './components/gene/components/gene/gene-notes/gene-notes.component';
import { GeneVariantComponent } from './components/gene-variant/gene-variant.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    NavbarComponent,
    FooterComponent,
    GenesComponent,
    GeneComponent,
    LiteratureComponent,
    GeneDetailsComponent,
    GeneVariantsComponent,
    GeneNotesComponent,
    GeneVariantComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    AccordionModule,
    BrowserAnimationsModule,
    MdCardModule,
    TruncateModule,
    OverlayPanelModule,
    PanelModule,
    DialogModule,
    ButtonModule,
    DropdownModule
  ],
  providers: [
    GeneService,
    LiteratureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
