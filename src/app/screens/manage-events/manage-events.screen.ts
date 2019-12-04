import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Host, TickeTing } from '@ticketing/angular';
import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './manage-events.screen.html',
  styleUrls:['./manage-events.screen.scss']
})
export class ManageEventsScreen{
  public host: Host;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing, private _sessionManager: SessionManager){
    this.host = null;
  }

  ngOnInit(){
    this._ticketing.host.list(this._sessionManager.getActiveSession().account).then(hosts => {
      for(let host of hosts){
        if(host.name == this._activatedRoute.snapshot.params.host){
          this.host = host;
          break;
        }
      }
    })
  }
}
