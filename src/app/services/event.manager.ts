import { Injectable } from '@angular/core';
import { Event } from '@ticketing/angular';

@Injectable()
export class EventManager{
  private _activeEvent: Event;

  constructor(){
    this._activeEvent = null;
  }

  setActiveEvent(event: Event){
    this._activeEvent = event;
  }

  getActiveEvent(){
    return this._activeEvent;
  }

  hasActiveEvent(): boolean{
    return this._activeEvent !== null;
  }
}
