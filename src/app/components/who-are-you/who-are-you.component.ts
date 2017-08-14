import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ng2-cookies';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppUserModel} from '../../models/api/app-user.model';
import {AuthService} from '../../services/auth.service';
import {Log} from 'ng2-logger';

const log = Log.create('WhoAreYouComponent');

@Component({
  selector: 'app-who-are-you',
  templateUrl: './who-are-you.component.html',
  styleUrls: ['./who-are-you.component.scss']
})
export class WhoAreYouComponent implements OnInit {
  emailForm: FormGroup;
  validForm = true;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group(
      {
        email: ['', Validators.email]
      }
    );
  }

  onSave() {
    if (this.emailForm.valid) {
      this.authService
        .authenticate(this.emailForm.value.email)
        .subscribe(
          (appUser: AppUserModel) => {
            this.router.navigate(['/']);
          },
          (err) => {
            log.error('auth error', err);
            this.validForm = false;
          }
        );
    } else {
      this.validForm = false;
    }
  }

}
