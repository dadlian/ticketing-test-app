import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account, Event, Advertisement, Host, TickeTing } from '@ticketing/angular';
import { EventManager } from '../../services/event.manager';
import { AdManager } from '../../services/ad.manager';
import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './host-detail.screen.html',
  styleUrls:['./host-detail.screen.scss']
})
export class HostDetailScreen{
  public activeUser: Account;
  public host: Host;
  public filter: string;
  public timestamp: number;
  public administrators: Array<Account>;
  public newAdmin: string;
  public message: string;
  public loading: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing,
              private _router: Router, private _eventManager: EventManager,
              private _adManager: AdManager, private _sessionManager: SessionManager){
    this.activeUser = null;
    this.host = null
    this.filter = ""
    this.administrators = []
    this.newAdmin = ""
    this.message = ""
    this.loading = false
  }

  ngOnInit(){
    this.activeUser = this._sessionManager.getActiveSession().account
    this.filter = this._activatedRoute.snapshot.params.tab

    let hostURI = atob(this._activatedRoute.snapshot.params.host)
    this._ticketing.host.retrieve(hostURI).then(host => {
      this.host = host;
      this._eventManager.setActiveHost(host)
      this.timestamp = Date.now()

      this.host.administrators.then(administrators => {
        this.administrators = administrators
      })
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

  updateCandidate(event){
    this.newAdmin = event.target.value
  }

  addAdministrator(){
    if(this.newAdmin && !this.loading){
      this.loading = true;
      this.message = ""

      this._ticketing.account.findUser(this.newAdmin).then(account=> {
        this.host.addAdministrator(account).then(administrators => {
          this.message = "Administrator added successfully"
          this.administrators = administrators
          this.newAdmin = ""
        })
      }).catch(error => {
        this.message = "There is no user matching your search"
      }).finally(() => {
        this.loading = false;
      })
    }
  }

  removeAdministrator(administrator){
    this.host.removeAdministrator(administrator).then(administrators => {
      this.message = "Administrator removed successfully"
      this.administrators = administrators
    })
  }
}
