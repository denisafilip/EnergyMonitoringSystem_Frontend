import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthenticationService, UserAuth} from '../../services/authentication/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  errorMessage = '';
  user: UserAuth | undefined;
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
          token: user.token,
          role: user.role
        }
        console.log(user);
        sessionStorage.setItem(this.tokenKey, this.user.token);
        console.log(this.user.role);
        if (this.user.role == 'CLIENT') {
          this.router.navigate(['/client']).then(() => {});
        } else if (this.user.role == 'ADMIN') {
          this.router.navigate(['/dashboard/admin']).then(() => {});
        } else {
          this.router.navigate(['/login']).then(() => {});
        }
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
}
