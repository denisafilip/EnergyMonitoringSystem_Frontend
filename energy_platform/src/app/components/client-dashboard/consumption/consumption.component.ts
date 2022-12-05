import {Component, OnInit} from '@angular/core';
import {Device} from "../../../models/device/device.model";
import {Mapping} from "../../../models/mapping/mapping.model";
import {User} from "../../../models/user/user.model";
import {DeviceService} from "../../../services/device/device.service";
import {MappingService} from "../../../services/mapping/mapping.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {DatePipe} from "@angular/common";
import {Consumption} from "../../../models/consumption/consumption.model";
import {ConsumptionService} from "../../../services/consumption/consumption.service";
import {CanvasJS} from "../../../../assets/canvasjs.angular.component";
import {firstValueFrom} from "rxjs";
import {webSocket} from "rxjs/webSocket";

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {

  devices?: Device[];
  currentUser?: User | null;
  currentDevice?: Device;
  date?: any;
  mapping?: Mapping;
  consumptions?: Consumption[];
  chartOptions: any;
  dataPoints?: any[];
  subject?: any;

  constructor(private deviceService: DeviceService,
              private mappingService: MappingService,
              private consumptionService: ConsumptionService,
              private authenticationService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.devices = [];
    this.consumptions = [];
    this.mapping = new Mapping();
    this.dataPoints = [];
    this.currentUser = this.authenticationService.getCurrentUser();
    this.retrieveDevices();

    this.subject = webSocket(`ws://127.0.0.1:8000/ws/client/${this.authenticationService.getCurrentUserId()}/`);
    console.log(`ws://127.0.0.1:8000/ws/client/${this.authenticationService.getCurrentUserId()}/`);
    this.subject.subscribe({
      next: (notification: any) => {
        //console.log('message received: ' + notification);
        console.log('message received: ' + notification.notification);
        alert(notification.notification);
        //alert(notification);
      }, // Called whenever there is a message from the server.
      error: (err: any) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }

  async createChart() {
    await this.getDataPoints();
    console.log(this.dataPoints);
    let chart = new CanvasJS.Chart("energyConsumptionChart",
      this.chartOptions = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Daily Energy Consumption"
        },
        axisY: {
          labelFormatter: (e: any) => {
            let suffix = "kW";
            return e.value + suffix;
          }
        },
        data: [{
          type: "line",
          xValueFormatString: "YYYY",
          yValueFormatString: "#,###.##kW",
          dataPoints: this.dataPoints,
        }]
      }
    );
    chart.render();
  }

  getMapping(): void {
    this.mappingService.findByUserAndDevice(this.currentUser?.id, this.currentDevice?.id)
      .subscribe({
        next: (data) => {
          this.mapping = data.pop();
          console.log(this.mapping)
        },
        error: (e) => console.error(e)
      })
  }

  getDate(event: any): void {
    this.date = new DatePipe('en').transform(event.value, 'yyyy-MM-dd')
    console.log(this.date);
  }

  async chooseDevice() {
    this.dataPoints = [];
    await this.createChart();
  }

  async getConsumptions() {
    return await firstValueFrom(this.consumptionService.findByMappingAndDate(this.mapping?.id, this.date));
  }

  setActiveDevice(device: Device): void {
    this.currentDevice = device;
    this.dataPoints = [];
    console.log(this.currentDevice);
    this.getMapping();
  }

  getDevice(device_id: any): void {
    this.deviceService.get(device_id)
      .subscribe( {
          next: (data) => {
            this.devices?.push(data)
          },
          error: (e) => console.error(e)
        }
      )
  }

  getDevicesFromMappings(mappings: Mapping[]): void {
    mappings?.map((mapping) => this.getDevice(mapping.device))
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

  async getDataPoints() {
    await this.getConsumptions().then(consumptions => {
      if (typeof consumptions != "undefined" && consumptions.length > 0) {
        for (const consumption of consumptions) {
          const consumptionDate = new Date(consumption.timestamp);
          this.dataPoints?.push({x: consumptionDate.getUTCHours(), y: consumption.consumption})
        }
      }
      console.log(this.dataPoints);
    })
  }

}
