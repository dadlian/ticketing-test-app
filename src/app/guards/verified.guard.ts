import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { SessionManager } from '../services/session.manager';

@Injectable()
export class VerifiedGuard implements CanActivate, CanActivateChild{
  constructor(private _router: Router, private _sessionManager: SessionManager){}

  canActivate(): Promise<boolean>{
    return new Promise((resolve)=>{
      this._sessionManager.hasActiveSession().then(hasActiveSession => {
        if(hasActiveSession && this._sessionManager.getActiveSession().account.verified){
          resolve(true)
        }else{
          this._router.navigate(["/verify-account"]);
          resolve(false)
        }
      })
    })
  }

  canActivateChild(): Promise<boolean>{
    return this.canActivate();
  }
}
