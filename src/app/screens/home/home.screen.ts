import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TickeTing, Account, UNAUTHORISED_ACCESS } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './home.screen.html',
  styleUrls:['./home.screen.scss']
})
export class HomeScreen{
  public account: Account;
  public error: string;

  constructor(private _ticketing: TickeTing, private _sessionManager: SessionManager, private _router: Router, private _activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this._sessionManager.hasActiveSession().then(hasActiveSession => {
      if(hasActiveSession){
        this._ticketing.account.retrieve(this._activatedRoute.snapshot.paramMap.get("account")).then((account: Account) => {
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
      }else{
        this._router.navigate(["/login"])
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
