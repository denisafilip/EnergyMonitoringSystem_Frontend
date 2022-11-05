import { Component, OnInit } from '@angular/core';
import {Device} from "../../../models/device/device.model";
import {DeviceService} from "../../../services/device/device.service";

@Component({
  selector: 'app-device-api',
  templateUrl: './device-api.component.html',
  styleUrls: ['./device-api.component.css']
})
export class DeviceApiComponent implements OnInit {


  devices?: Device[];
  currentDevice: Device = {};
  currentIndex = -1;
  name = '';

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.retrieveDevices();
  }

  retrieveDevices(): void {
    this.deviceService.getAll()
      .subscribe({
        next: (data) => {
          this.devices = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveDevices();
    this.currentDevice = {};
    this.currentIndex = -1;
  }

  setActiveDevice(device: Device, index: number): void {
    this.currentDevice = device;
    this.currentIndex = index;
  }

  removeAllDevices(): void {
    this.deviceService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentDevice = {};
    this.currentIndex = -1;

    this.deviceService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.devices = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
