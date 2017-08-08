import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  AccordionModule, ButtonModule, DataTableModule, DialogModule, DropdownModule, InputTextModule, OverlayPanelModule,
  PanelModule,
  EditorModule,
  SharedModule, ListboxModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import { Error404Component } from './components/error-404/error-404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GenesComponent } from './components/genes/genes.component';
import {GeneService} from './services/gene.service';
import { GeneComponent } from './components/gene/gene.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdCardModule,
  MdProgressSpinnerModule

} from '@angular/material';
import { LiteratureComponent } from './components/literature/literature.component';
import {LiteratureService} from './services/literature.service';
import { TruncateModule } from 'ng2-truncate';
import { GeneDetailsComponent } from './components/gene/components/gene/gene-details/gene-details.component';
import { GeneVariantsComponent } from './components/gene/components/gene/gene-variants/gene-variants.component';
import { GeneAnnotationsComponent } from './components/gene/components/gene/gene-annotations/gene-annotations.component';
import { GeneVariantComponent } from './components/gene-variant/gene-variant.component';
import {
  GeneVariantLiteratureDataTableComponent
} from './components/gene-variant-literature-data-table/gene-variant-literature-data-table.component';
import { GeneVariantAnnotationsComponent } from './components/gene-variant/gene-variant-annotations/gene-variant-annotations.component';
import { IdentityServiceCallbackComponent } from './identity-service-callback/identity-service-callback.component';
import {NgxOidcClientModule, OIDC_CLIENT_CONFIG, NgxOidcClientService} from 'ngx-oidc-client';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { FirstItemPipe } from './pipes/first-item.pipe';
import {CurrentPreviousItemsService} from './services/current-previous-items.service';
import {GeneVariantService} from './services/gene-variant.service';

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
    GeneAnnotationsComponent,
    GeneVariantComponent,
    GeneVariantLiteratureDataTableComponent,
    GeneVariantAnnotationsComponent,
    IdentityServiceCallbackComponent,
    AuthCallbackComponent,
    FirstItemPipe

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    AccordionModule,
    MdCardModule,
    MdProgressSpinnerModule,
    TruncateModule,
    OverlayPanelModule,
    PanelModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    EditorModule,
    ListboxModule,
    NgxOidcClientModule
  ],
  providers: [
    GeneService,
    LiteratureService,
    NgxOidcClientService,
    {
      provide: OIDC_CLIENT_CONFIG,
      useValue: {
        authority: 'http://localhost:5000',
        client_id: 'js',
        popup_redirect_uri: 'http://localhost:4200/auth.html',
        response_type: 'id_token token',
        scope: 'openid profile api1',
        post_logout_redirect_uri : 'http://localhost:4200'
      }
    },
    CurrentPreviousItemsService,
    GeneVariantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
