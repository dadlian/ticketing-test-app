import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Session, UNAUTHORISED_ACCESS } from '@ticketing/angular';

@Component({
  templateUrl: './login.screen.html',
  styleUrls:['./login.screen.scss']
})
export class LoginScreen{
  public error: string;
  public loginForm: FormGroup;

  constructor(private _ticketing: TickeTing, private _router: Router){
    this.error = "";

    this.loginForm = new FormGroup({
      identification: new FormControl(),
      password: new FormControl()
    })
  }

  login(){
    this.error = "";

    this._ticketing.startSession(this.loginForm.value.identification,this.loginForm.value.password).then((session: Session) => {
      this._router.navigate(["/verify-account",session.account.number]);
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
