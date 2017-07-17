import {Component, OnInit} from '@angular/core';
import { Log } from 'ng2-logger';
import {NgxOidcClientService} from 'ngx-oidc-client';

const log = Log.create('AppComponent');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string;
  pass: string;

  constructor(
    private ngxOidcClientService: NgxOidcClientService,
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.ngxOidcClientService
      .signin()
      .subscribe(
        (user) => {
          log.info('got user', user);
        },
        (err) => {
          log.error('got error', err);
        }
      );
  }

  logout() {
  }
}
