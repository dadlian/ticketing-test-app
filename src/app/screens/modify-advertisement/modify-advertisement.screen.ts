import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { TickeTing, Event, Advertisement, Zone, INVALID_VALUES, UNAUTHORISED_ACCESS, NOT_UNIQUE } from '@ticketing/angular';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './modify-advertisement.screen.html',
  styleUrls:['./modify-advertisement.screen.scss']
})
export class ModifyAdvertisementScreen{
  public error: string;
  public zones: Array<Zone>;
  public events: Array<Event>;
  public advertisementForm: FormGroup;

  private _advertisement: Advertisement;
  private _artwork: string;

  constructor(private _ticketing: TickeTing, private _router: Router,
              private _activatedRoute: ActivatedRoute, private _eventManager: EventManager){
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
    this._activatedRoute.params.subscribe(params => {
      this._eventManager.getActiveHost().events.then(events => {
        this.events = events;
      })

      this._ticketing.advertisement.listZones().then(zones => {
        this.zones = zones;
      })

      this._ticketing.advertisement.retrieve(atob(params.advertisement)).then((advertisement: any) => {
        this._advertisement = advertisement;

        this.advertisementForm.setValue({
          name: advertisement.name,
          description: advertisement.description,
          event: advertisement.event,
          zones: [],
          schedule: []
        })

        for(let zone of advertisement.zones){
          (this.advertisementForm.get('zones') as FormArray).push(new FormControl(zone.number))
        }

        for(let timeslot of advertisement.schedule){
          (this.advertisementForm.get('schedule') as FormArray).push(new FormGroup({
            start: new FormControl(timeslot.start),
            end: new FormControl(timeslot.end)
          }))
        }
      }).catch((error: number) => {
        switch(error){
          case UNAUTHORISED_ACCESS:
            this.error = "You are not permitted to create advertisements."
            break;
          default:
            this.error = "The TickeTing server experienced an error. Please try again later."
        }
      })
    })
  }

  saveAdvertisement(){
    this.error = "";

    this._advertisement.name = this.advertisementForm.value.name
    this._advertisement.description = this.advertisementForm.value.description,
    this._advertisement.event = this.events[this.advertisementForm.value.event]
    this._advertisement.zones = this.advertisementForm.value.zones
    this._advertisement.artwork = this._artwork
    this._advertisement.schedule = []

    for(let i = 0; i < this.advertisementForm.value.schedule.length; i++){
      this._advertisement.schedule.push({
        start:this.advertisementForm.value.schedule[i].start.replace("T"," "),
        end:this.advertisementForm.value.schedule[i].end.replace("T"," ")
      })
    }

    this._advertisement.save().then((success: boolean) => {
      if(success){
        let host = this._eventManager.getActiveHost()
        this._router.navigate(["/hosts", host.name, "advertisements"]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create advertisements."
          break;
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  deleteAdvertisement(){
    this.error = "";

    this._advertisement.delete().then((success: boolean) => {
      if(success){
        let host = this._eventManager.getActiveHost()
        this._router.navigate(["/hosts", host.name, "advertisements"]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create advertisements."
          break;
        case NOT_UNIQUE:
          this.error = "A advertisement cannot be deleted if it is staging events."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  addZone(){
    (this.advertisementForm.get('zones') as FormArray).push(new FormControl(""))
  }

  removeZone(i: number){
    (this.advertisementForm.get('zones') as FormArray).removeAt(i)
  }

  addTimeslot(){
    (this.advertisementForm.get('schedule') as FormArray).push(new FormGroup({
      start: new FormControl(""),
      end: new FormControl("")
    }))
  }

  removeTimeslot(i: number){
    (this.advertisementForm.get('schedule') as FormArray).removeAt(i)
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
