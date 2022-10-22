import { environment } from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators'
import {User} from "../services/authentication.service";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(
      environment.apiUrl + 'login/',
      {
          email: email,
          password: password,
      },
    ).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  public register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(
      environment.apiUrl + 'register/',
      {
        name: name,
        email: email,
        password: password,
      }
    ).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
