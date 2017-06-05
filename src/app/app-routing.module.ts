/**
 * Created by jboswell on 5/22/2017.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {Error404Component} from "./components/error-404/error-404.component";
import {GenesComponent} from "./components/genes/genes.component";
import {GeneComponent} from "./components/gene/gene.component";
import {LiteratureComponent} from "./components/literature/literature.component";
import {GeneVariantComponent} from "./components/gene-variant/gene-variant.component";

const routes: Routes = [
  {
    path: '',
    component: GenesComponent
  },
  {
    path: 'genes',
    component: GenesComponent
  },
  {
    path: 'literatures',
    component: LiteratureComponent
  },
  {
    path: 'gene/:id',
    component: GeneComponent
  },
  {
    path: 'gene-variant/:id',
    component: GeneVariantComponent
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
