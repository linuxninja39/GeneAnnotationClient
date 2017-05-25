import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DataTableModule,SharedModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./components/home/home.component";
import { Error404Component } from './components/error-404/error-404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GenesComponent } from './components/genes/genes.component';
import {GeneService} from "./components/genes/services/gene.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    NavbarComponent,
    FooterComponent,
    GenesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    SharedModule
  ],
  providers: [
    GeneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
