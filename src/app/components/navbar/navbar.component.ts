import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AppUserModel} from '../../models/api/app-user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  appUser: AppUserModel;

  constructor(
     private authService: AuthService
  ) { }

  ngOnInit() {
    this.appUser = this.authService.User;
  }

}
