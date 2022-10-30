import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.authenticationService.register(
      this.registerForm.get('name')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value
    ).subscribe({
      next: () => {
        this.router.navigate(['/login']).then(() => {});
      }, error: (error) => {
        this.errorMessage = error;
      }
    });
  }
}
