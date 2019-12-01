import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Session, UNAUTHORISED_ACCESS } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './login.screen.html',
  styleUrls:['./login.screen.scss']
})
export class LoginScreen{
  public error: string;
  public loginForm: FormGroup;

  constructor(private _router: Router, private _sessionManager: SessionManager){
    this.error = "";

    this.loginForm = new FormGroup({
      identification: new FormControl(),
      password: new FormControl()
    })
  }

  login(){
    this.error = "";

    this._sessionManager.login(this.loginForm.value.identification,this.loginForm.value.password).then((session: Session) => {
      let route = session.account.verified?"/home":"/verify-account";
      this._router.navigate([route,session.account.number]);
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "The given username/email address or password were incorrect."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
