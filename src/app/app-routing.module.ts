/**
 * Created by jboswell on 5/22/2017.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {Error404Component} from "./components/error-404/error-404.component";
import {GenesComponent} from "./components/genes/genes.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'genes',
    component: GenesComponent
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
