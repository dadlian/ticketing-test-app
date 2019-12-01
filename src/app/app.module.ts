import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TickeTingModule } from '@ticketing/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthorisedGuard } from './guards/authorised.guard';
import { UnauthorisedGuard } from './guards/unauthorised.guard';
import { VerifiedGuard } from './guards/verified.guard';
import { UnverifiedGuard } from './guards/unverified.guard';

import { SessionManager } from './services/session.manager';

import { LoginScreen } from './screens/login/login.screen';
import { CreateAccountScreen } from './screens/create-account/create-account.screen';
import { VerifyAccountScreen } from './screens/verify-account/verify-account.screen';
import { MainMenuScreen } from './screens/main-menu/main-menu.screen';
import { ManageHostsScreen } from './screens/manage-hosts/manage-hosts.screen';
import { CreateHostScreen } from './screens/create-host/create-host.screen';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreen,
    CreateAccountScreen,
    VerifyAccountScreen,
    MainMenuScreen,
    ManageHostsScreen,
    CreateHostScreen
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TickeTingModule
  ],
  providers: [
    SessionManager,
    AuthorisedGuard,
    UnauthorisedGuard,
    VerifiedGuard,
    UnverifiedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
