import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Venue, INVALID_VALUES, UNAUTHORISED_ACCESS, NOT_UNIQUE } from '@ticketing/angular';

@Component({
  templateUrl: './modify-venue.screen.html',
  styleUrls:['./modify-venue.screen.scss']
})
export class ModifyVenueScreen{
  public error: string;
  public venueForm: FormGroup;

  private _venue: Venue;

  constructor(private _ticketing: TickeTing, private _router: Router, private _activatedRoute: ActivatedRoute){
    this.error = "";

    this.venueForm = new FormGroup({
      name: new FormControl(""),
      address: new FormControl(""),
      latitude: new FormControl(""),
      longitude: new FormControl("")
    })
  }

  ngOnInit(){
    this._activatedRoute.params.subscribe(params => {
      this._ticketing.venue.retrieve(atob(params.venue)).then((venue: any) => {
        this._venue = venue;
        this.venueForm.setValue({
          name: venue.name,
          address: venue.address,
          latitude: venue.latitude,
          longitude: venue.longitude
        })
      }).catch((error: number) => {
        switch(error){
          case UNAUTHORISED_ACCESS:
            this.error = "You are not permitted to create venues."
            break;
          default:
            this.error = "The TickeTing server experienced an error. Please try again later."
        }
      })
    })
  }

  saveVenue(){
    this.error = "";

    this._venue.name = this.venueForm.value.name,
    this._venue.address = this.venueForm.value.address,
    this._venue.latitude = this.venueForm.value.latitude,
    this._venue.longitude = this.venueForm.value.longitude

    this._venue.save().then((success: boolean) => {
      if(success){
        this._router.navigate(["/venues"]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
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

  deleteVenue(){
    this.error = "";

    this._venue.delete().then((success: boolean) => {
      if(success){
        this._router.navigate(["/venues"]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create venues."
          break;
        case NOT_UNIQUE:
          this.error = "A venue cannot be deleted if it is staging events."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
