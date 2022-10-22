import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthenticationService, User} from '../services/authentication.service';
import {throwError} from "rxjs";
import {AuthenticationClient} from "../clients/authentication.client";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  errorMessage = '';
  user: User | undefined;
  private tokenKey = 'token';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.errorMessage = "";
    this.authenticationService.login(
      this.loginForm.get('email')!.value,
      this.loginForm!.get('password')!.value
    ).subscribe({
      next: (user) => {
        this.user = {
          email: user.email,
          token: user.token
        }
        localStorage.setItem(this.tokenKey, this.user.token);
        this.router.navigate(['/']).then(r => {});
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
}
