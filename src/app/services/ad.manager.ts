import { Injectable } from '@angular/core';
import { Advertisement } from '@ticketing/angular';

@Injectable()
export class AdManager{
  private _activeAd: Advertisement;

  constructor(){
    this._activeAd = null;
  }

  setActiveAd(advertisement: Advertisement){
    this._activeAd = advertisement;
  }

  getActiveAd(){
    return this._activeAd;
  }

  hasActiveAd(): boolean{
    return this._activeAd !== null;
  }
}
