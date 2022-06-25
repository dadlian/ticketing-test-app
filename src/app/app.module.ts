import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { TickeTingModule } from '@ticketing/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment'
import { AuthorisedGuard } from './guards/authorised.guard';
import { UnauthorisedGuard } from './guards/unauthorised.guard';
import { VerifiedGuard } from './guards/verified.guard';
import { UnverifiedGuard } from './guards/unverified.guard';
import { ActiveHostGuard } from './guards/active-host.guard';
import { ActiveEventGuard } from './guards/active-event.guard';
import { ActiveAdGuard } from './guards/active-ad.guard';
import { ActiveOrderGuard } from './guards/active-order.guard';

import { SessionManager } from './services/session.manager';
import { EventManager } from './services/event.manager';
import { AdManager } from './services/ad.manager';
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
import { HostDetailScreen } from './screens/host-detail/host-detail.screen';
import { CreateEventScreen } from './screens/create-event/create-event.screen';
import { ModifyEventScreen } from './screens/modify-event/modify-event.screen';
import { CreateShowingScreen } from './screens/create-showing/create-showing.screen';
import { EventDetailScreen } from './screens/event-detail/event-detail.screen';
import { CreateSectionScreen } from './screens/create-section/create-section.screen';
import { ModifySectionScreen } from './screens/modify-section/modify-section.screen';
import { ManageVenuesScreen } from './screens/manage-venues/manage-venues.screen';
import { CreateVenueScreen } from './screens/create-venue/create-venue.screen';
import { ModifyVenueScreen } from './screens/modify-venue/modify-venue.screen';
import { ManageCategoriesScreen } from './screens/manage-categories/manage-categories.screen';
import { CreateCategoryScreen } from './screens/create-category/create-category.screen';
import { ModifyCategoryScreen } from './screens/modify-category/modify-category.screen';
import { ManageSubmissionsScreen } from './screens/manage-submissions/manage-submissions.screen';
import { ManageZonesScreen } from './screens/manage-zones/manage-zones.screen';
import { CreateZoneScreen } from './screens/create-zone/create-zone.screen';
import { CreateAdvertisementScreen } from './screens/create-advertisement/create-advertisement.screen';
import { ModifyAdvertisementScreen } from './screens/modify-advertisement/modify-advertisement.screen';
import { RedeemTicketsScreen } from './screens/redeem-tickets/redeem-tickets.screen';
import { SalesSummaryScreen } from './screens/sales-summary/sales-summary.screen';
import { UsersScreen } from './screens/users/users.screen';

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
    HostDetailScreen,
    CreateEventScreen,
    ModifyEventScreen,
    CreateShowingScreen,
    EventDetailScreen,
    CreateSectionScreen,
    ModifySectionScreen,
    ManageVenuesScreen,
    CreateVenueScreen,
    ModifyVenueScreen,
    ManageCategoriesScreen,
    CreateCategoryScreen,
    ModifyCategoryScreen,
    ManageSubmissionsScreen,
    ManageZonesScreen,
    CreateZoneScreen,
    CreateAdvertisementScreen,
    ModifyAdvertisementScreen,
    RedeemTicketsScreen,
    SalesSummaryScreen,
    UsersScreen
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxScannerQrcodeModule,
    TickeTingModule.forRoot({environment: environment.name}),
  ],
  providers: [
    SessionManager,
    EventManager,
    AdManager,
    OrderManager,
    ResetManager,
    AuthorisedGuard,
    UnauthorisedGuard,
    VerifiedGuard,
    UnverifiedGuard,
    ActiveEventGuard,
    ActiveHostGuard,
    ActiveAdGuard,
    ActiveOrderGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
