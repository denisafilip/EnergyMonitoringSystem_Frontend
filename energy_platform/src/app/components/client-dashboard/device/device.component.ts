import {Component, Injectable, OnInit} from '@angular/core';
import {Device} from "../../../models/device/device.model";
import {DeviceService} from "../../../services/device/device.service";
import {MappingService} from "../../../services/mapping/mapping.service";
import {User} from "../../../models/user/user.model";
import {Mapping} from "../../../models/mapping/mapping.model";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DeviceComponent implements OnInit {

  devices?: Device[];
  mappings?: Mapping[];
  currentUser?: User;
  name = '';

  constructor(private deviceService: DeviceService,
              private mappingService: MappingService,
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit(): void {
    this.devices = [];
    this.retrieveDevices();
  }

  getDevice(device_id: any): void {
    this.deviceService.get(device_id)
      .subscribe( {
        next: (data) => {
          this.devices?.push(data)
          console.log(data)
        },
        error: (e) => console.error(e)
    }
      )
  }

  getDevicesFromMappings(mappings: Mapping[]): void {
    mappings?.map((mapping) => this.getDevice(mapping.device))
    console.log(this.devices);
  }

  public retrieveDevices(): void {
    this.mappingService.findByUser(this.authenticationService.getCurrentUser()?.id)
      .subscribe({
        next: (data) => {
          this.getDevicesFromMappings(data);
        },
        error: (e) => console.error(e)
      });
  }

}
