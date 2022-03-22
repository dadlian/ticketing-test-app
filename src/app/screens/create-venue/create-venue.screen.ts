import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Venue, INVALID_VALUES, UNAUTHORISED_ACCESS } from '@ticketing/angular';

@Component({
  templateUrl: './create-venue.screen.html',
  styleUrls:['./create-venue.screen.scss']
})
export class CreateVenueScreen{
  public error: string;
  public venueForm: FormGroup;

  constructor(private _ticketing: TickeTing, private _router: Router){
    this.error = "";

    this.venueForm = new FormGroup({
      name: new FormControl(""),
      address: new FormControl(""),
      latitude: new FormControl(""),
      longitude: new FormControl("")
    })
  }

  createVenue(){
    this.error = "";

    this._ticketing.venue.create({
      name: this.venueForm.value.name,
      address: this.venueForm.value.address,
      latitude: this.venueForm.value.latitude,
      longitude: this.venueForm.value.longitude
    }).then((venue: Venue) => {
      this._router.navigate(["/venues"]);
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create venues."
          break;
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
