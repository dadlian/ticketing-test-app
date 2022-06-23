import { Component } from '@angular/core';
import { ActivitySummary } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './users.screen.html',
  styleUrls:['./users.screen.scss']
})
export class UsersScreen{
  public activity: ActivitySummary;

  constructor(private _sessionManager: SessionManager){
    this.activity = null;
  }

  ngOnInit(){
    this._sessionManager.getActiveSession().account.getActivity().then(activity => {
      this.activity = activity
      console.log(this.activity)
    })
  }
}
