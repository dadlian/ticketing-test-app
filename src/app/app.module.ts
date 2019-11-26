import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TickeTingModule } from '@ticketing/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginScreen } from './screens/login/login.screen';
import { CreateAccountScreen } from './screens/create-account/create-account.screen';
import { VerifyAccountScreen } from './screens/verify-account/verify-account.screen';
import { HomeScreen } from './screens/home/home.screen';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreen,
    CreateAccountScreen,
    VerifyAccountScreen,
    HomeScreen
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TickeTingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
