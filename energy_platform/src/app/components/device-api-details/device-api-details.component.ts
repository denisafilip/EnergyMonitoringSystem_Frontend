import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user/user.model";
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Device} from "../../models/device/device.model";
import {DeviceService} from "../../services/device/device.service";

@Component({
  selector: 'app-device-api-details',
  templateUrl: './device-api-details.component.html',
  styleUrls: ['./device-api-details.component.css']
})
export class DeviceApiDetailsComponent implements OnInit {


  @Input() viewMode = false;

  @Input() currentDevice: Device = {
    name: '',
    description: '',
    address: '',
    max_hourly_consumption: 0,
  };

  message = '';

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getDevice(this.route.snapshot.params["id"]);
    }
  }

  getDevice(id: string): void {
    this.deviceService.get(id)
      .subscribe({
        next: (data) => {
          this.currentDevice = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateName(name: string): void {
    const data = {
      description: this.currentDevice.description,
      name: name,
      address: this.currentDevice.address,
      max_hourly_consumption: this.currentDevice.max_hourly_consumption
    };

    this.message = '';

    this.deviceService.update(this.currentDevice.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentDevice.name = name;
          this.message = res.message ? res.message : 'The name was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateDevice(): void {
    this.message = '';

    this.deviceService.update(this.currentDevice.id, this.currentDevice)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This device was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteDevice(): void {
    this.deviceService.delete(this.currentDevice.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/admin/devices']).then(r => {});
        },
        error: (e) => console.error(e)
      });
  }
}
