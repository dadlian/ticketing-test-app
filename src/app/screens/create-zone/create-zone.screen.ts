import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Zone, INVALID_VALUES, UNAUTHORISED_ACCESS, NOT_UNIQUE } from '@ticketing/angular';

@Component({
  templateUrl: './create-zone.screen.html',
  styleUrls:['./create-zone.screen.scss']
})
export class CreateZoneScreen{
  public error: string;
  public zoneForm: FormGroup;

  constructor(private _ticketing: TickeTing, private _router: Router){
    this.error = "";

    this.zoneForm = new FormGroup({
      name: new FormControl(""),
      description: new FormControl(""),
      width: new FormControl(""),
      height: new FormControl("")
    })
  }

  createZone(){
    this.error = "";

    this._ticketing.advertisement.createZone({
      name: this.zoneForm.value.name,
      description: this.zoneForm.value.description,
      width: this.zoneForm.value.width,
      height: this.zoneForm.value.height
    }).then((zone: Zone) => {
      this._router.navigate(["/zones"]);
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create ad zones."
          break;
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        case NOT_UNIQUE:
          this.error = "The given zone name has already been created.";
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
