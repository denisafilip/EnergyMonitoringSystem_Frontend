import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Mapping} from "../../models/mapping/mapping.model";

const baseUrl = environment.apiUrl + "mappings/"

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Mapping[]> {
    return this.http.get<Mapping[]>(baseUrl);
  }

  public get(id: any): Observable<Mapping> {
    return this.http.get<Mapping>(`${baseUrl}${id}/`);
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

  findByUser(user: any): Observable<Mapping[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user", user);

    return this.http.get<Mapping[]>(`${baseUrl}`, {params: queryParams});
  }

  findByUserAndDevice(user: any, device: any): Observable<Mapping[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user", user);
    queryParams = queryParams.append("device", device);

    return this.http.get<Mapping[]>(`${baseUrl}`, {params: queryParams});
  }
}
