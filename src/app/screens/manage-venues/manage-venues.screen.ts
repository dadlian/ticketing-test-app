import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Venue, TickeTing } from '@ticketing/angular';

@Component({
  templateUrl: './manage-venues.screen.html',
  styleUrls:['./manage-venues.screen.scss']
})
export class ManageVenuesScreen{
  public venues: Array<Venue>;

  constructor(private _router: Router, private _ticketing: TickeTing){
    this.venues = [];
  }

  ngOnInit(){
    this._ticketing.event.venue.list().then(venues => {
      for(let venue of venues){
        this.venues.push(venue);
      }
    }).catch((error: number) => {
      this.venues.length = 0;
    })
  }

  addVenue(){
    this._router.navigate(["/create-venue"])
  }

  modifyVenue(venue){
    this._router.navigate([`/modify-venue/${btoa(venue)}`])
  }
}
