import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ng2-cookies';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    private formBuilder: FormBuilder
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
      this.cookieService.set('appUser', this.emailForm.value.email);
      this.router.navigate(['/']);
    } else {
      this.validForm = false;
    }
  }

}
