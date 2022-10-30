import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

export interface UserAuth {
  email: string;
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';

  user: UserAuth | undefined;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public login(email: string, password: string): Observable<UserAuth> {
    return this.http.post<UserAuth>(
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

  public register(name: string, email: string, password: string): Observable<UserAuth> {
    return this.http.post<UserAuth>(
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

  public logout() {
    sessionStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']).then(r => {});
  }

  public isLoggedIn(): boolean {
    let token = sessionStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? sessionStorage.getItem(this.tokenKey) : null;
  }
}
