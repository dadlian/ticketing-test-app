import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event, Advertisement, Host, TickeTing } from '@ticketing/angular';
import { SessionManager } from '../../services/session.manager';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './manage-events.screen.html',
  styleUrls:['./manage-events.screen.scss']
})
export class ManageEventsScreen{
  public host: Host;
  public filter: string;
  public timestamp: number;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing, private _router: Router,
              private _sessionManager: SessionManager, private _eventManager: EventManager){
    this.host = null;
    this.filter = "events";
  }

  ngOnInit(){
    this._ticketing.host.list(this._sessionManager.getActiveSession().account).then(hosts => {
      for(let host of hosts){
        if(host.name == this._activatedRoute.snapshot.params.host){
          this.host = host;
          this._eventManager.setActiveHost(host)
          this.timestamp = Date.now()
          break;
        }
      }
    })
  }

  createShowing(event: Event){
    this._eventManager.setActiveEvent(event)
    this._router.navigate(["/events/create-showing"]);
  }

  selectEvent(event: Event){
    this._eventManager.setActiveEvent(event)
    this._router.navigate([`/events/${btoa(event.self)}`]);
  }

  filterContent(newFilter: string){
    this.filter = newFilter;
  }

  submitAd(advertisement: Advertisement){
    advertisement.submit()
  }
}
