import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.router.navigate(['/login']).then(() => {});
  }

  register(): void {
    this.router.navigate(['/register']).then(() => {});
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
