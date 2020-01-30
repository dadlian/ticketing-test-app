import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TickeTingModule } from '@ticketing/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthorisedGuard } from './guards/authorised.guard';
import { UnauthorisedGuard } from './guards/unauthorised.guard';
import { VerifiedGuard } from './guards/verified.guard';
import { UnverifiedGuard } from './guards/unverified.guard';
import { ActiveEventGuard } from './guards/active-event.guard';
import { ActiveOrderGuard } from './guards/active-order.guard';

import { SessionManager } from './services/session.manager';
import { EventManager } from './services/event.manager';
import { OrderManager } from './services/order.manager';

import { LoginScreen } from './screens/login/login.screen';
import { CreateAccountScreen } from './screens/create-account/create-account.screen';
import { VerifyAccountScreen } from './screens/verify-account/verify-account.screen';
import { MainMenuScreen } from './screens/main-menu/main-menu.screen';
import { HomeScreen } from './screens/home/home.screen';
import { PlaceOrderScreen } from './screens/place-order/place-order.screen';
import { PaymentScreen } from './screens/payment/payment.screen';
import { ManageHostsScreen } from './screens/manage-hosts/manage-hosts.screen';
import { CreateHostScreen } from './screens/create-host/create-host.screen';
import { ManageEventsScreen } from './screens/manage-events/manage-events.screen';
import { CreateEventScreen } from './screens/create-event/create-event.screen';
import { CreateShowingScreen } from './screens/create-showing/create-showing.screen';
import { EventDetailScreen } from './screens/event-detail/event-detail.screen';
import { CreateSectionScreen } from './screens/create-section/create-section.screen';
import { ManageSubmissionsScreen } from './screens/manage-submissions/manage-submissions.screen';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreen,
    CreateAccountScreen,
    VerifyAccountScreen,
    MainMenuScreen,
    HomeScreen,
    PlaceOrderScreen,
    PaymentScreen,
    ManageHostsScreen,
    CreateHostScreen,
    ManageEventsScreen,
    CreateEventScreen,
    CreateShowingScreen,
    EventDetailScreen,
    CreateSectionScreen,
    ManageSubmissionsScreen
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TickeTingModule
  ],
  providers: [
    SessionManager,
    EventManager,
    OrderManager,
    AuthorisedGuard,
    UnauthorisedGuard,
    VerifiedGuard,
    UnverifiedGuard,
    ActiveEventGuard,
    ActiveOrderGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
