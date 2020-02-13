import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, INVALID_VALUES } from '@ticketing/angular';

import { ResetManager } from '../../services/reset.manager';

@Component({
  templateUrl: './request-reset.screen.html',
  styleUrls:['./request-reset.screen.scss']
})
export class RequestResetScreen{
  public error: string;
  public resetForm: FormGroup;

  constructor(private _router: Router, private _resetManager: ResetManager, private _ticketing: TickeTing){
    this.error = "";

    this.resetForm = new FormGroup({
      identification: new FormControl(),
      password: new FormControl()
    })
  }

  request(){
    this.error = "";
    if(this.resetForm.value.identification && this.resetForm.value.password){
      this._ticketing.account.requestReset(this.resetForm.value.identification,this.resetForm.value.password).then(reset => {
        if(reset){
          this._resetManager.setActiveReset(reset);
          this._router.navigate(["/confirm-reset"]);
        }else{
          this.error = "Your password reset request could not be sent at this time."
        }
      }).catch((error: number) => {
        switch(error){
          case INVALID_VALUES:
            this.error = "Your password reset request could not be sent at this time."
            break;
          default:
            this.error = "The TickeTing server experienced an error. Please try again later."
        }
      })
    }
  }
}
