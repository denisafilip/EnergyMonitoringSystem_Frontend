import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {WeatherClient} from "../clients/weather.client";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public weather: Observable<any> = this.weatherClient.getWeatherData();

  constructor(
    private authenticationService: AuthenticationService,
    private weatherClient: WeatherClient
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authenticationService.logout();
  }
}
