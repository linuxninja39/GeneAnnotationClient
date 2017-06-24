import {Component, OnInit} from '@angular/core';
import * as Oidc from 'oidc-client/lib/oidc-client.js';
import {Http, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import { Log } from 'ng2-logger';

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
    private http: Http
  ) {

    var config = {
      authority: "http://localhost:5000",
      client_id: "js",
      popup_redirect_uri: "http://localhost:4200/identity-service-callback",
      response_type: "id_token token",
      scope:"openid profile api1",
      post_logout_redirect_uri : "http://localhost:4200",
    };
    log.info('config', config);
    this.mgr = new Oidc.UserManager(config);

    this.mgr.events.addUserLoaded(
      (user: Oidc.User) => {
        log.info('user loaded', user);
      }
    );


    this.mgr.events.addUserUnloaded((e) => log.info('addUserUnLoaded', e));

    this.mgr.events.addSilentRenewError((e) => log.info('addSilentRenewError', e));

    this.mgr.events.addUserSignedOut((e) => log.info('addUserSignedOut', e));

    log.info('mgr', this.mgr);

  }

  ngOnInit() {
    this.checkLoggedIn();
  }

  login() {
    this.mgr.signinPopup();
  }

  logout() {
    this.mgr.signoutPopup();
  }

  checkLoggedIn() {

    this.mgr.getUser().then(
      (user) => {
        if (user) {
          console.log('got user', user);
        } else {
          console.log('not logged in');
        }
      }
    );

    /*
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.set('client_id', 'client');
    body.set('client_secret', 'secret');
    body.set('grant_type', 'password');
    body.set('scope', 'api1');
    body.set('username', 'alice');
    body.set('password', 'password');

    this.http
      .post(
        'http://localhost:5000/connect/token',
        body
      )
      .subscribe(
        (res) => {
          console.log('got token reponse', res);
        },
        (err) => {
          console.log('got token reponse err', err);
        }
      )
    ;



    console.log("login", this.username, this.pass);
    */
  }
}
