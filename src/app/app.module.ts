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
import { ResetManager } from './services/reset.manager';

import { LoginScreen } from './screens/login/login.screen';
import { RequestResetScreen } from './screens/request-reset/request-reset.screen';
import { ConfirmResetScreen } from './screens/confirm-reset/confirm-reset.screen';
import { CreateAccountScreen } from './screens/create-account/create-account.screen';
import { VerifyAccountScreen } from './screens/verify-account/verify-account.screen';
import { MainMenuScreen } from './screens/main-menu/main-menu.screen';
import { HomeScreen } from './screens/home/home.screen';
import { PlaceOrderScreen } from './screens/place-order/place-order.screen';
import { PaymentScreen } from './screens/payment/payment.screen';
import { WalletScreen } from './screens/wallet/wallet.screen';
import { TicketScreen } from './screens/ticket/ticket.screen';
import { SendTransferScreen } from './screens/send-transfer/send-transfer.screen';
import { TransferScreen } from './screens/transfer/transfer.screen';

import { ManageHostsScreen } from './screens/manage-hosts/manage-hosts.screen';
import { CreateHostScreen } from './screens/create-host/create-host.screen';
import { ManageEventsScreen } from './screens/manage-events/manage-events.screen';
import { CreateEventScreen } from './screens/create-event/create-event.screen';
import { CreateShowingScreen } from './screens/create-showing/create-showing.screen';
import { EventDetailScreen } from './screens/event-detail/event-detail.screen';
import { CreateSectionScreen } from './screens/create-section/create-section.screen';
import { ManageSubmissionsScreen } from './screens/manage-submissions/manage-submissions.screen';
import { ManageZonesScreen } from './screens/manage-zones/manage-zones.screen';
import { CreateZoneScreen } from './screens/create-zone/create-zone.screen';
import { CreateAdvertisementScreen } from './screens/create-advertisement/create-advertisement.screen';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreen,
    RequestResetScreen,
    ConfirmResetScreen,
    CreateAccountScreen,
    VerifyAccountScreen,
    MainMenuScreen,
    HomeScreen,
    PlaceOrderScreen,
    PaymentScreen,
    WalletScreen,
    TicketScreen,
    SendTransferScreen,
    TransferScreen,
    ManageHostsScreen,
    CreateHostScreen,
    ManageEventsScreen,
    CreateEventScreen,
    CreateShowingScreen,
    EventDetailScreen,
    CreateSectionScreen,
    ManageSubmissionsScreen,
    ManageZonesScreen,
    CreateZoneScreen,
    CreateAdvertisementScreen
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TickeTingModule.forRoot({production: false})
  ],
  providers: [
    SessionManager,
    EventManager,
    OrderManager,
    ResetManager,
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
