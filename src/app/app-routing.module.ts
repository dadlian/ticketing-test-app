import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginScreen } from './screens/login/login.screen';
import { CreateAccountScreen } from './screens/create-account/create-account.screen';
import { VerifyAccountScreen } from './screens/verify-account/verify-account.screen';
import { HomeScreen } from './screens/home/home.screen';


const routes: Routes = [
  {
    path:"login",
    component: LoginScreen
  },
  {
    path:"create-account",
    component: CreateAccountScreen
  },
  {
    path:"verify-account/:account",
    component: VerifyAccountScreen
  },
  {
    path:"home/:account",
    component: HomeScreen
  },
  {
    path:"**",
    redirectTo:"login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
