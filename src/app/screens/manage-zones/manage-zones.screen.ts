import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Zone, TickeTing } from '@ticketing/angular';

@Component({
  templateUrl: './manage-zones.screen.html',
  styleUrls:['./manage-zones.screen.scss']
})
export class ManageZonesScreen{
  public zones: Array<Zone>;

  constructor(private _router: Router, private _ticketing: TickeTing){
    this.zones = [];
  }

  ngOnInit(){
    this._ticketing.advertisement.listZones().then(zones => {
      for(let zone of zones){
        this.zones.push(zone);
      }
    }).catch((error: number) => {
      this.zones.length = 0;
    })
  }

  createZone(){
    this._router.navigate(["/create-zone"])
  }
}
