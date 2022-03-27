import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { TickeTing, Host, Zone, Event, Advertisement, INVALID_VALUES } from '@ticketing/angular';

import { EventManager } from '../../services/event.manager';
import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './create-advertisement.screen.html',
  styleUrls:['./create-advertisement.screen.scss']
})
export class CreateAdvertisementScreen{
  public error: string;
  public advertisementForm: FormGroup;
  public zones: Array<Zone>;
  public events: Array<Event>;

  private _artwork: string;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing,
              private _router: Router, private _sessionManager: SessionManager,
              private _eventManager: EventManager){
    this.error = "";
    this.zones = [];
    this.events = [];
    this._artwork = "";

    this.advertisementForm = new FormGroup({
      name: new FormControl(""),
      description: new FormControl(""),
      event: new FormControl(null),
      zones: new FormArray([]),
      schedule: new FormArray([])
    })
  }

  ngOnInit(){
    this._eventManager.getActiveHost().events.then(events => {
      this.events = events;
    })

    this._ticketing.advertisement.listZones().then(zones => {
      this.zones = zones;
    })
  }

  createAdvertisement(){
    this.error = "";

    let payload = {
      name: this.advertisementForm.value.name,
      description: this.advertisementForm.value.description,
      event: this.events[this.advertisementForm.value.event],
      zones: this.advertisementForm.value.zones,
      schedule: [],
      artwork: this._artwork
    }

    for(let i = 0; i < this.advertisementForm.value.schedule.length; i++){
      payload.schedule.push({
        start:this.advertisementForm.value.schedule[i].start.replace("T"," "),
        end:this.advertisementForm.value.schedule[i].end.replace("T"," ")
      })
    }

    let host = this._eventManager.getActiveHost()
    host.createAdvertisement(payload).then((advertisement: Advertisement) => {
      this._router.navigate(["/hosts/"+name]);
    }).catch((error: number) => {
      switch(error){
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  addZone(){
    (this.advertisementForm.get('zones') as FormArray).push(new FormControl(""))
  }

  addTimeslot(){
    (this.advertisementForm.get('schedule') as FormArray).push(new FormGroup({
      start: new FormControl(""),
      end: new FormControl("")
    }))
  }

  cacheArtwork(event){
    let image = event.target.files[0];
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      this._artwork = reader.result;
    }.bind(this), false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
