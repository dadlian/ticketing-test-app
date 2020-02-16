import { Component } from '@angular/core';
import { TickeTing, Event, Advertisement } from '@ticketing/angular';

@Component({
  templateUrl:'./manage-submissions.screen.html',
  styleUrls:['./manage-submissions.screen.scss']
})
export class ManageSubmissionsScreen{
  public events: Array<Event>;
  public advertisements: Array<Advertisement>;
  public filter: string;

  constructor(private _ticketing: TickeTing){
    this.events = [];
    this.advertisements = [];
    this.filter = "events";
  }

  ngOnInit(){
    this._ticketing.event.submissions().then(submissions => {
      this.events = submissions;
    })

    this._ticketing.advertisement.submissions().then(submissions => {
      this.advertisements = submissions;
    })
  }

  filterContent(newFilter: string){
    this.filter = newFilter;
  }

  publishEvent(event: Event){
    event.publish();

    let newSubmissions = [];
    for(let submission of this.events){
      if(submission !== event){
        newSubmissions.push(event)
      }
    }

    this.events = newSubmissions;
  }

  approveAdvertisement(advertisement: Advertisement){
    advertisement.approve().then(result => {
      if(result){
        let newSubmissions = [];
        for(let submission of this.advertisements){
          if(submission !== advertisement){
            newSubmissions.push(advertisement)
          }
        }

        this.advertisements = newSubmissions;
      }
    })
  }

  denyAdvertisement(advertisement: Advertisement){
    advertisement.deny().then(result => {
      if(result){
        let newSubmissions = [];
        for(let submission of this.advertisements){
          if(submission !== advertisement){
            newSubmissions.push(advertisement)
          }
        }

        this.advertisements = newSubmissions;
      }
    })
  }

  getZones(advertisement: Advertisement){
    let zones: Array<string> = []
    for(let zone of advertisement.zones){
      zones.push(zone.number)
    }

    return zones.join(", ");
  }
}
