import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Account, INVALID_VALUES, NOT_UNIQUE } from '@ticketing/angular';

@Component({
  templateUrl: './create-account.screen.html',
  styleUrls:['./create-account.screen.scss']
})
export class CreateAccountScreen{
  public error: string;
  public accountForm: FormGroup;

  constructor(private _ticketing: TickeTing, private _router: Router){
    this.error = "";

    this.accountForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
    })
  }

  createAccount(){
    this.error = "";

    this._ticketing.account.create({
      username: this.accountForm.value.username,
      email: this.accountForm.value.email,
      firstName: this.accountForm.value.firstName,
      lastName: this.accountForm.value.lastName
    },this.accountForm.value.password).then((account: Account) => {
      this._router.navigate(["/login"]);
    }).catch((error: number) => {
      switch(error){
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        case NOT_UNIQUE:
          this.error = "The given username or email address has already been registered.";
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
