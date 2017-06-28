import { Component, OnInit } from '@angular/core';
import * as Oidc from 'oidc-client/lib/oidc-client.js';
import { Log } from 'ng2-logger';

const log = Log.create('IdentityServiceCallbackComponent');

@Component({
  selector: 'app-identity-service-callback',
  templateUrl: './identity-service-callback.component.html',
  styleUrls: ['./identity-service-callback.component.scss']
})
export class IdentityServiceCallbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new Oidc.UserManager().signinPopupCallback()
      .then(
        () => {
          log.info('signin popup redirect callback success');
        }
      )
      .catch(
        (e) => {
          log.error('got error', e);
        }
      )
    ;
  }

}
