import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Device} from "../../models/device/device.model";

const baseUrl = environment.apiUrl + "devices/"

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Device[]> {
    return this.http.get<Device[]>(baseUrl);
  }

  public get(id: any): Observable<Device> {
    return this.http.get<Device>(`${baseUrl}${id}/`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}${id}/`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}${id}/`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<Device[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", name);

    return this.http.get<Device[]>(`${baseUrl}`, {params: queryParams});
  }
}
