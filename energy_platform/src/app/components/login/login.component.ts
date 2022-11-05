import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthenticationService, UserAuth} from '../../services/authentication/authentication.service';
import {UserService} from "../../services/user/user.service";
import jwtDecode from "jwt-decode";

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
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  storeUser(id: any): void {
    console.log(id)
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          console.log(data)
          sessionStorage.setItem("currentUser", JSON.stringify(data));
        },
        error: (e) => console.error(e)
      })
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

        const token = this.authenticationService.getToken() as string;
        const payload = jwtDecode(token) as any;
        const id = payload.id;

        this.storeUser(id);
        console.log(this.authenticationService.getCurrentUser());
        this.authenticationService.redirect(this.user);

      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
}
