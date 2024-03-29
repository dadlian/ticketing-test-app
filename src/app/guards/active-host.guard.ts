import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { EventManager } from '../services/event.manager';

@Injectable()
export class ActiveHostGuard implements CanActivate, CanActivateChild{
  constructor(private _router: Router, private _eventManager: EventManager){}

  canActivate(): Promise<boolean>{
    return new Promise((resolve)=>{
      if(this._eventManager.hasActiveHost()){
        resolve(true)
      }else{
        this._router.navigate(["/"]);
        resolve(false)
      }
    })
  }

  canActivateChild(): Promise<boolean>{
    return this.canActivate();
  }
}
