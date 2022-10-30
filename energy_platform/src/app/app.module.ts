import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {TokenInterceptor} from "./helpers/token.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { RegisterComponent } from './components/register/register.component';
import {ErrorIntercept} from "./error.interceptor";
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { ClientApiComponent } from './components/client-api/client-api.component';
import { ClientDetailsComponent } from './components/client-api-details/client-details.component';
import { DeviceApiComponent } from './components/device-api/device-api.component';
import { DeviceApiDetailsComponent } from './components/device-api-details/device-api-details.component';
import { DeviceApiAddComponent } from './components/device-api-add/device-api-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AdminComponent,
    ClientComponent,
    ClientApiComponent,
    ClientDetailsComponent,
    DeviceApiComponent,
    DeviceApiDetailsComponent,
    DeviceApiAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,  //handling forms in angular
    ReactiveFormsModule,
    FlexLayoutModule, //supports flex styling
    MatButtonModule,  //from angular material
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
