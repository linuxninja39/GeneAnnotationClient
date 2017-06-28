import {Component, Inject, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import { Log } from 'ng2-logger';
import {NgxOidcClientService, OIDC_CLIENT_CONFIG} from 'ngx-oidc-client';

const log = Log.create('AppComponent');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string;
  pass: string;
  mgr;

  constructor(
    private ngxOidcClientService: NgxOidcClientService,
    @Inject(OIDC_CLIENT_CONFIG) public config
  ) {
  }

  ngOnInit() {
  }

  login() {
  }

  logout() {
  }

  checkLoggedIn() {

  }
}
