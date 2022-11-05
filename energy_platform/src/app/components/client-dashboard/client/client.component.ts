import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authenticationService.logout();
  }

}
