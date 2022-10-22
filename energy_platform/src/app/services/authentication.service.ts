import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

export interface User {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';

  user: User | undefined;

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router,
    private http: HttpClient
  ) {}

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

  public register(name: string, email: string, password: string): void {
    this.authenticationClient
      .register(name, email, password)
      .subscribe((user) => {
        this.user = {
          email: user.email,
          token: user.token
        }
        localStorage.setItem(this.tokenKey, this.user.token);
        this.router.navigate(['/']).then(r => {});
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']).then(r => {});
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
