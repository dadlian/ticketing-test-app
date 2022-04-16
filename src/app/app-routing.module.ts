import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorisedGuard } from './guards/authorised.guard';
import { UnauthorisedGuard } from './guards/unauthorised.guard';
import { VerifiedGuard } from './guards/verified.guard';
import { UnverifiedGuard } from './guards/unverified.guard';
import { ActiveHostGuard } from './guards/active-host.guard';
import { ActiveEventGuard } from './guards/active-event.guard';
import { ActiveAdGuard } from './guards/active-ad.guard';
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
        path:'hosts/:host/create-event',
        component:CreateEventScreen,
        canActivate:[ActiveHostGuard]
      },
      {
        path:'hosts/:host/create-advertisement',
        component:CreateAdvertisementScreen,
        canActivate:[ActiveHostGuard]
      },
      {
        path:'hosts/:host/:tab',
        component:HostDetailScreen
      },
      {
        path:'advertisements/:advertisement',
        component:ModifyAdvertisementScreen,
        canActivate:[ActiveAdGuard]
      },
      {
        path:'events/create-showing',
        component:CreateShowingScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'events/create-section',
        component:CreateSectionScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'events/:event',
        component:EventDetailScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'events/:event/edit',
        component:ModifyEventScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'events/:event/sections/:section',
        component:ModifySectionScreen,
        canActivate:[ActiveEventGuard]
      },
      {
        path:'venues',
        component:ManageVenuesScreen
      },
      {
        path:'create-venue',
        component:CreateVenueScreen
      },
      {
        path:'modify-venue/:venue',
        component:ModifyVenueScreen
      },
      {
        path:'categories',
        component:ManageCategoriesScreen
      },
      {
        path:'create-category',
        component:CreateCategoryScreen
      },
      {
        path:'modify-category/:category',
        component:ModifyCategoryScreen
      },
      {
        path:'zones',
        component:ManageZonesScreen
      },
      {
        path:'create-zone',
        component:CreateZoneScreen
      },
      {
        path:'redeem-tickets',
        component:RedeemTicketsScreen
      }
    ]
  },
  {
    path:"**",
    redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
