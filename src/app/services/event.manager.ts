import { Injectable } from '@angular/core';
import { Event, Host } from '@ticketing/angular';

@Injectable()
export class EventManager{
  private _activeEvent: Event;
  private _activeHost: Host;

  constructor(){
    this._activeEvent = null;
    this._activeHost = null;
  }

  setActiveHost(host: Host){
    this._activeHost = host;
  }

  getActiveHost(){
    return this._activeHost;
  }

  hasActiveHost(): boolean{
    return this._activeHost !== null;
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
