import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AdManager } from '../services/ad.manager';

@Injectable()
export class ActiveAdGuard implements CanActivate, CanActivateChild{
  constructor(private _router: Router, private _adManager: AdManager){}

  canActivate(): Promise<boolean>{
    return new Promise((resolve)=>{
      if(this._adManager.hasActiveAd()){
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
