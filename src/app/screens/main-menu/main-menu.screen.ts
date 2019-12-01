import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TickeTing, Account, UNAUTHORISED_ACCESS } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './main-menu.screen.html',
  styleUrls:['./main-menu.screen.scss']
})
export class MainMenuScreen{
  public account: Account;
  public error: string;

  constructor(private _ticketing: TickeTing, private _sessionManager: SessionManager, private _router: Router){}

  ngOnInit(){
    this._ticketing.account.retrieve(this._sessionManager.getActiveSession().account.number).then((account: Account) => {
      this.account = account;
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You do not have permission to view this user account."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  logout(){
    this._sessionManager.logout().then(success => {
      if(success){
        this._router.navigate(["/login"])
      }else{
        this.error = "You could not be logged out. Please try again."
      }
    })
  }
}
