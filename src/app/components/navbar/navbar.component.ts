import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userEmail: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userEmail = this.authService.User;
  }

}
