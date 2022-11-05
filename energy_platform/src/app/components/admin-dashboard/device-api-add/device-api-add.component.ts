import { Component, OnInit } from '@angular/core';
import {Device} from "../../../models/device/device.model";
import {DeviceService} from "../../../services/device/device.service";

@Component({
  selector: 'app-device-api-add',
  templateUrl: './device-api-add.component.html',
  styleUrls: ['./device-api-add.component.css']
})
export class DeviceApiAddComponent implements OnInit {

  device: Device = {
    name: '',
    description: '',
    address: '',
    max_hourly_consumption: 0,
  };
  submitted = false;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  saveDevice(): void {
    const data = {
      name: this.device.name,
      description: this.device.description,
      address: this.device.address,
      max_hourly_consumption: this.device.max_hourly_consumption
    };

    this.deviceService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newDevice(): void {
    this.submitted = false;
    this.device = {
      name: '',
      description: '',
      address: '',
      max_hourly_consumption: 0
    };
  }

}
