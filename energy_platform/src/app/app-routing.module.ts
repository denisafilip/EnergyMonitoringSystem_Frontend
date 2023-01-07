import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./helpers/auth.guard";
import {RegisterComponent} from "./components/register/register.component";
import {AdminComponent} from "./components/admin-dashboard/admin/admin.component";
import {ClientComponent} from "./components/client-dashboard/client/client.component";
import {ClientApiComponent} from "./components/admin-dashboard/client-api/client-api.component";
import {ClientDetailsComponent} from "./components/admin-dashboard/client-api-details/client-details.component";
import {DeviceApiComponent} from "./components/admin-dashboard/device-api/device-api.component";
import {DeviceApiDetailsComponent} from "./components/admin-dashboard/device-api-details/device-api-details.component";
import {MappingComponent} from "./components/admin-dashboard/mapping/mapping.component";
import {DeviceComponent} from "./components/client-dashboard/device/device.component";
import {Role} from "./services/authentication/authentication.service";
import {ConsumptionComponent} from "./components/client-dashboard/consumption/consumption.component";
import {ChatComponent} from "./components/client-dashboard/chat/chat.component";
import {ChatComponentAdmin} from "./components/admin-dashboard/chat/chat.component";

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
    data: {
      role: [Role.ADMIN],
    },
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
      },
      {
        path: "mappings",
        component: MappingComponent
      },
      {
        path: "chat",
        component: ChatComponentAdmin
      }
    ]
  },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Role.CLIENT],
    },
    children: [
      {
        path: "devices",
        component: DeviceComponent
      },
      {
        path: "consumption",
        component: ConsumptionComponent
      },
      {
        path: "chat",
        component: ChatComponent
      }
    ]
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
