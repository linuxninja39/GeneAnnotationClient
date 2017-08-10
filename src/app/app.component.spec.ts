import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {NgxOidcClientService, OIDC_CLIENT_CONFIG} from 'ngx-oidc-client/lib';
import {AuthService} from './services/auth.service';
import {CookieService} from 'ng2-cookies';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        NgxOidcClientService,
        AuthService,
        CookieService,
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
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
