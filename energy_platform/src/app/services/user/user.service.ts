import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user/user.model";
import {environment} from "../../../environments/environment";

const baseUrl = environment.apiUrl + "clients/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  public get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch<User>(`${baseUrl}${id}/`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}${id}/`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByEmail(email: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?email=${email}`);
  }
}
