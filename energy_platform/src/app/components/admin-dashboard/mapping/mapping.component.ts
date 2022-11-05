import { Component, OnInit } from '@angular/core';
import {Device} from "../../../models/device/device.model";
import {DeviceService} from "../../../services/device/device.service";
import {User} from "../../../models/user/user.model";
import {UserService} from "../../../services/user/user.service";
import {MappingService} from "../../../services/mapping/mapping.service";

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  devices?: Device[];
  users?: User[];
  currentDevice: Device = {};
  currentUser: User = {};

  submitted = false;

  constructor(private deviceService: DeviceService,
              private userService: UserService,
              private mappingService: MappingService) { }

  ngOnInit(): void {
    this.retrieveDevices();
    this.retrieveUsers();
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

  setActiveDevice(device: Device): void {
    this.currentDevice = device;
    console.log(this.currentDevice);
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  setActiveUser(user: User): void {
    this.currentUser = user;
    console.log(this.currentUser);
  }

  saveMapping(): void {
    const data = {
      user: this.currentUser.id,
      device: this.currentDevice.id,
    };
    console.log(data);

    this.mappingService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newMapping(): void {
    this.submitted = false;
    this.currentUser = new Device();
    this.currentDevice = new User();
  }

}
