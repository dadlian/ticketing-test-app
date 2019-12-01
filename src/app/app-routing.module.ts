import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorisedGuard } from './guards/authorised.guard';
import { UnauthorisedGuard } from './guards/unauthorised.guard';
import { VerifiedGuard } from './guards/verified.guard';
import { UnverifiedGuard } from './guards/unverified.guard';

import { LoginScreen } from './screens/login/login.screen';
import { CreateAccountScreen } from './screens/create-account/create-account.screen';
import { VerifyAccountScreen } from './screens/verify-account/verify-account.screen';
import { MainMenuScreen } from './screens/main-menu/main-menu.screen';
import { ManageHostsScreen } from './screens/manage-hosts/manage-hosts.screen';
import { CreateHostScreen } from './screens/create-host/create-host.screen';


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
