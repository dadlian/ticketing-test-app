import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorisedGuard } from './guards/authorised.guard';
import { UnauthorisedGuard } from './guards/unauthorised.guard';
import { VerifiedGuard } from './guards/verified.guard';
import { UnverifiedGuard } from './guards/unverified.guard';
import { ActiveEventGuard } from './guards/active-event.guard';
import { ActiveOrderGuard } from './guards/active-order.guard';

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


const routes: Routes = [
  {
    path:"login",
    canActivate:[UnauthorisedGuard],
    component: LoginScreen
  },
  {
    path:"request-reset",
    canActivate:[UnauthorisedGuard],
    component: RequestResetScreen
  },
  {
    path:"confirm-reset",
    canActivate:[UnauthorisedGuard],
    component: ConfirmResetScreen
  },
  {
    path:"create-account",
    canActivate:[UnauthorisedGuard],
    component: CreateAccountScreen
  },
  {
    path:"verify-account",
    canActivateChild:[AuthorisedGuard,UnverifiedGuard],
    component: MainMenuScreen,
    children: [
      {
        path:"",
        component: VerifyAccountScreen
      }
    ]
  },
  {
    path:"",
    canActivate:[AuthorisedGuard],
    canActivateChild:[AuthorisedGuard,VerifiedGuard],
    component: MainMenuScreen,
    children:[
      {
        path:'',
        component:HomeScreen
      },
      {
        path:'order',
        component:PlaceOrderScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'payment',
        component:PaymentScreen,
        canActivate:[ActiveOrderGuard]
      },
      {
        path:'wallet',
        component:WalletScreen
      },
      {
        path:'tickets',
        component:TicketScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'transfer',
        component:SendTransferScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'list-transfers',
        component:TransferScreen
      },
      {
        path:'hosts',
        component:ManageHostsScreen
      },
      {
        path:'submissions',
        component:ManageSubmissionsScreen
      },
      {
        path:'create-host',
        component:CreateHostScreen
      },
      {
        path:'hosts/:host',
        component:ManageEventsScreen
      },
      {
        path:'hosts/:host/create-event',
        component:CreateEventScreen
      },
      {
        path:'events/create-showing',
        component:CreateShowingScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'events/detail',
        component:EventDetailScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'events/create-section',
        component:CreateSectionScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'zones',
        component:ManageZonesScreen
      },
      {
        path:'create-zone',
        component:CreateZoneScreen
      }
    ]
  },
  {
    path:"**",
    redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
