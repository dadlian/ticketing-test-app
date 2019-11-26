import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing } from '@ticketing/angular';

@Component({
  templateUrl: './verify-account.screen.html',
  styleUrls:['./verify-account.screen.scss']
})
export class VerifyAccountScreen{
  public error: string;
  public verifyAccountForm: FormGroup;

  constructor(private _ticketing: TickeTing, private _router: Router, private _activatedRoute: ActivatedRoute){
    this.error = "";

    this.verifyAccountForm = new FormGroup({
      code: new FormControl()
    })
  }

  verifyAccount(){
    this.error = "";

    this._ticketing.verifyAccount(this._activatedRoute.snapshot.paramMap.get("account"),this.verifyAccountForm.value.code).then((success: boolean) => {
      if(success){
        this._router.navigate(["/home"]);
      }else{
        this.error = "Your account code not be verified with the provided code."
      }
    }).catch((error: number) => {
      this.error = "The TickeTing server experienced an error. Please try again later."
    })
  }
}
