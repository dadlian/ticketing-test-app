import { Injectable } from '@angular/core';
import { Reset } from '@ticketing/angular';

@Injectable()
export class ResetManager{
  private _activeReset: Reset;

  constructor(){
    this._activeReset = null;
  }

  setActiveReset(reset: Reset){
    this._activeReset = reset;
  }

  getActiveReset(){
    return this._activeReset;
  }

  hasActiveReset(): boolean{
    return this._activeReset !== null;
  }
}
