import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DataTableModule, InputTextModule, SharedModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./components/home/home.component";
import { Error404Component } from './components/error-404/error-404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GenesComponent } from './components/genes/genes.component';
import {GeneService} from "./components/genes/services/gene.service";
import { GeneComponent } from './gene/gene.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    NavbarComponent,
    FooterComponent,
    GenesComponent,
    GeneComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    InputTextModule
  ],
  providers: [
    GeneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
