import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Reset, INVALID_VALUES } from '@ticketing/angular';

import { ResetManager } from '../../services/reset.manager';

@Component({
  templateUrl: './confirm-reset.screen.html',
  styleUrls:['./confirm-reset.screen.scss']
})
export class ConfirmResetScreen{
  public error: string;
  public resetForm: FormGroup;
  private _reset: Reset;

  constructor(private _router: Router, private _resetManager: ResetManager){
    this.error = "";
    this._reset = null;

    this.resetForm = new FormGroup({
      code: new FormControl()
    })
  }

  ngOnInit(){
    this._reset = this._resetManager.getActiveReset();
  }

  reset(){
    this.error = "";
    if(this.resetForm.value.code){
      this._reset.confirm(this.resetForm.value.code).then(result => {
        if(result){
          this._router.navigate(["/login"]);
        }
      }).catch((error: number) => {
        switch(error){
          case INVALID_VALUES:
            this.error = "Your password could not be reset at this time."
            break;
          default:
            this.error = "The TickeTing server experienced an error. Please try again later."
        }
      })
    }
  }
}
