import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event, Advertisement, Host, TickeTing } from '@ticketing/angular';
import { SessionManager } from '../../services/session.manager';
import { EventManager } from '../../services/event.manager';
import { AdManager } from '../../services/ad.manager';

@Component({
  templateUrl: './host-detail.screen.html',
  styleUrls:['./host-detail.screen.scss']
})
export class HostDetailScreen{
  public host: Host;
  public filter: string;
  public timestamp: number;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing, private _router: Router,
              private _sessionManager: SessionManager, private _eventManager: EventManager,
              private _adManager: AdManager){
    this.host = null
    this.filter = ""
  }

  ngOnInit(){
    this.filter = this._activatedRoute.snapshot.params.tab

    let hostURI = atob(this._activatedRoute.snapshot.params.host)
    this._ticketing.host.retrieve(hostURI).then(host => {
      this.host = host;
      this._eventManager.setActiveHost(host)
      this.timestamp = Date.now()
    })
  }

  editHost(){
    this._router.navigate([`/hosts/${btoa(this.host.self)}/edit`])
  }

  createShowing(event: Event){
    this._eventManager.setActiveEvent(event)
    this._router.navigate(["/events/create-showing"]);
  }

  selectEvent(event: Event){
    this._eventManager.setActiveEvent(event)
    this._router.navigate([`/events/${btoa(event.self)}`]);
  }

  selectAdvertisement(advertisement: Advertisement){
    this._adManager.setActiveAd(advertisement)
    this._router.navigate([`/advertisements/${btoa(advertisement.self)}`]);
  }

  filterContent(newFilter: string){
    this.filter = newFilter;
  }

  submitAd(advertisement: Advertisement){
    advertisement.submit()
  }
}
