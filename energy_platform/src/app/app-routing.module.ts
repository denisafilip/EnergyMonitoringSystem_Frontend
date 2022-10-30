import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./helpers/auth.guard";
import {RegisterComponent} from "./components/register/register.component";
import {AdminComponent} from "./components/admin/admin.component";
import {ClientComponent} from "./components/client/client.component";
import {ClientApiComponent} from "./components/client-api/client-api.component";
import {ClientDetailsComponent} from "./components/client-api-details/client-details.component";
import {DeviceApiComponent} from "./components/device-api/device-api.component";
import {DeviceApiDetailsComponent} from "./components/device-api-details/device-api-details.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard/admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "clients",
        component: ClientApiComponent
      },
      {
        path: "clients/:id",
        component: ClientDetailsComponent
      },
      {
        path: "devices",
        component: DeviceApiComponent
      },
      {
        path: "devices/:id",
        component: DeviceApiDetailsComponent
      }
    ]
  },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
