import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
import {NgxOidcClientService} from "ngx-oidc-client";

const log = Log.create('IdentityServiceCallbackComponent');

@Component({
  selector: 'app-identity-service-callback',
  templateUrl: './identity-service-callback.component.html',
  styleUrls: ['./identity-service-callback.component.scss']
})
export class IdentityServiceCallbackComponent implements OnInit {

  constructor(
    private ngxOidcClientService: NgxOidcClientService
  ) {
    console.log('oidc client service', ngxOidcClientService);
  }

  ngOnInit() {
    // log.info('called ngOnInit');
    this.ngxOidcClientService
      .signinCallback()
      .subscribe(
        (user) => {
          console.log('got appUser, n stuff', user);
        },
        (err) => {
          console.log('got error', err);
        }
      );
  }

}
