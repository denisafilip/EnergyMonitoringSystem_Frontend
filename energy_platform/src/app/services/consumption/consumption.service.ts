import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Mapping} from "../../models/mapping/mapping.model";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Consumption} from "../../models/consumption/consumption.model";

const baseUrl = environment.apiUrl + "consumptions/"

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Consumption[]> {
    return this.http.get<Consumption[]>(baseUrl);
  }

  public get(id: any): Observable<Consumption> {
    return this.http.get<Consumption>(`${baseUrl}${id}/`);
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

  findByMapping(mapping: any): Observable<Consumption[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("mapping", mapping);

    return this.http.get<Consumption[]>(`${baseUrl}`, {params: queryParams});
  }

  findByMappingAndDate(mapping: any, date: any): Observable<Consumption[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("mapping", mapping);
    queryParams = queryParams.append("date", date);

    return this.http.get<Consumption[]>(`${baseUrl}`, {params: queryParams});
  }

}
