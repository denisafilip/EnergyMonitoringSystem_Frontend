import {AuthenticationService, Role} from '../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']).then(() => {});
    }

    const token = this.authService.getToken() as string;
    const payload = jwtDecode(token) as any;
    const role = payload.role;
    const id = payload.id;
    console.log(role);
    console.log(id);

    if (role) {
      const roles = route.data["role"];
      if (roles && roles.indexOf(role) == -1) {
        if (role == "ADMIN") {
          this.router.navigate(['/dashboard/admin']).then(() => {});
        } else if (role == "CLIENT") {
          this.router.navigate(['/client']).then(() => {});
        }

      }
    }

    return true;
  }
}
