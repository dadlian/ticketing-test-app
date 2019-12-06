import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorisedGuard } from './guards/authorised.guard';
import { UnauthorisedGuard } from './guards/unauthorised.guard';
import { VerifiedGuard } from './guards/verified.guard';
import { UnverifiedGuard } from './guards/unverified.guard';
import { ActiveEventGuard } from './guards/active-event.guard';

import { LoginScreen } from './screens/login/login.screen';
import { CreateAccountScreen } from './screens/create-account/create-account.screen';
import { VerifyAccountScreen } from './screens/verify-account/verify-account.screen';
import { MainMenuScreen } from './screens/main-menu/main-menu.screen';
import { ManageHostsScreen } from './screens/manage-hosts/manage-hosts.screen';
import { CreateHostScreen } from './screens/create-host/create-host.screen';
import { ManageEventsScreen } from './screens/manage-events/manage-events.screen';
import { CreateEventScreen } from './screens/create-event/create-event.screen';
import { CreateShowingScreen } from './screens/create-showing/create-showing.screen';
import { EventDetailScreen } from './screens/event-detail/event-detail.screen';
import { CreateSectionScreen } from './screens/create-section/create-section.screen';


const routes: Routes = [
  {
    path:"login",
    canActivate:[UnauthorisedGuard],
    component: LoginScreen
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
    path:"home",
    canActivateChild:[AuthorisedGuard,VerifiedGuard],
    component: MainMenuScreen,
    children:[
      {
        path:'',
        component:ManageHostsScreen
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
      }
    ]
  },
  {
    path:"**",
    redirectTo:"home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
