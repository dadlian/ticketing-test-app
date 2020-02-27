import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NOT_UNIQUE } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './verify-account.screen.html',
  styleUrls:['./verify-account.screen.scss']
})
export class VerifyAccountScreen{
  public message: string;
  public error: string;
  public verifyAccountForm: FormGroup;

  constructor(private _router: Router, private _sessionManager: SessionManager){
    this.message = "";
    this.error = "";

    this.verifyAccountForm = new FormGroup({
      code: new FormControl()
    })
  }

  verifyAccount(){
    this.message = "";
    this.error = "";

    this._sessionManager.getActiveSession().account.verify(this.verifyAccountForm.value.code).then((success: boolean) => {
      if(success){
        this._router.navigate(["/"]);
      }else{
        this.error = "Your account code not be verified with the provided code."
      }
    }).catch((error: number) => {
      switch(error){
        case NOT_UNIQUE:
          this.error = "This account has already been verified.";
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
          break;
        }
    })
  }

  resendVerification(){
    this.message = "";
    this.error = "";

    this._sessionManager.getActiveSession().account.resendVerification().then((success: boolean) => {
      if(success){
        this.message = "Your account code has been resent to you. Please check your email.";
      }else{
        this.error = "Your account code could not be resent. Please try again."
      }
    }).catch((error: number) => {
      switch(error){
        case NOT_UNIQUE:
          this.error = "Your account code could not be resent. Please try again."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
          break;
        }
    })
  }
}
