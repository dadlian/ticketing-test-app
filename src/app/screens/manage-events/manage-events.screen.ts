import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event, Host, TickeTing } from '@ticketing/angular';
import { SessionManager } from '../../services/session.manager';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './manage-events.screen.html',
  styleUrls:['./manage-events.screen.scss']
})
export class ManageEventsScreen{
  public host: Host;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing, private _router: Router,
              private _sessionManager: SessionManager, private _eventManager: EventManager){
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

  createShowing(event: Event){
    this._eventManager.setActiveEvent(event)
    this._router.navigate(["/home/events/create-showing"]);
  }

  selectEvent(event: Event){
    this._eventManager.setActiveEvent(event)
    this._router.navigate(["/home/events/detail"]);
  }
}
