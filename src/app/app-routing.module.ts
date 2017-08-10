/**
 * Created by jboswell on 5/22/2017.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Error404Component} from './components/error-404/error-404.component';
import {GenesComponent} from './components/genes/genes.component';
import {GeneComponent} from './components/gene/gene.component';
import {LiteratureComponent} from './components/literature/literature.component';
import {GeneVariantComponent} from './components/gene-variant/gene-variant.component';
import {IdentityServiceCallbackComponent} from './identity-service-callback/identity-service-callback.component';
import {WhoAreYouComponent} from './components/who-are-you/who-are-you.component';
import {AuthedGuard} from './guards/authed.guard';

const routes: Routes = [
  {
    path: 'who',
    component: WhoAreYouComponent
  },
  {
    path: 'identity-service-callback',
    component: IdentityServiceCallbackComponent
  },
  {
    path: 'auth.html',
    component: IdentityServiceCallbackComponent
  },
  {
    path: '',
    canActivate: [AuthedGuard],
    children: [
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
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
