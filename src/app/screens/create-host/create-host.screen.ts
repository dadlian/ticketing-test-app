import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Host, INVALID_VALUES, NOT_UNIQUE } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './create-host.screen.html',
  styleUrls:['./create-host.screen.scss']
})
export class CreateHostScreen{
  public error: string;
  public hostForm: FormGroup;

  constructor(private _ticketing: TickeTing, private _router: Router, private _sessionManager: SessionManager){
    this.error = "";

    this.hostForm = new FormGroup({
      name: new FormControl(""),
      description: new FormControl(""),
      contact: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      website: new FormControl(""),
      firstAddressLine: new FormControl(""),
      secondAddressLine: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      country: new FormControl("")
    })
  }

  registerHost(){
    this.error = "";

    this._ticketing.host.create({
      name: this.hostForm.value.name,
      description: this.hostForm.value.description,
      contact: this.hostForm.value.contact,
      email: this.hostForm.value.email,
      phone: this.hostForm.value.phone,
      website: this.hostForm.value.website,
      firstAddressLine: this.hostForm.value.firstAddressLine,
      secondAddressLine: this.hostForm.value.secondAddressLine,
      city: this.hostForm.value.city,
      state: this.hostForm.value.state,
      country: this.hostForm.value.country
    },this._sessionManager.getActiveSession().account).then((host: Host) => {
      this._router.navigate(["/home"]);
    }).catch((error: number) => {
      switch(error){
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        case NOT_UNIQUE:
          this.error = "The given host name has already been registered.";
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
