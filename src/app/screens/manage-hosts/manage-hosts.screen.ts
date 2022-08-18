import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Host, TickeTing } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './manage-hosts.screen.html',
  styleUrls:['./manage-hosts.screen.scss']
})
export class ManageHostsScreen{
  public hosts: Array<Host>;

  constructor(private _router: Router, private _ticketing: TickeTing, private _sessionManager: SessionManager){
    this.hosts = [];
  }

  ngOnInit(){
    this._ticketing.host.list(this._sessionManager.getActiveSession().account).then(hosts => {
      for(let host of hosts){
        this.hosts.push(host);
      }
    }).catch((error: number) => {
      this.hosts.length = 0;
    })
  }

  loadHost(host){
    this._router.navigate(['/hosts',btoa(host.self),'events'])
  }

  registerHost(){
    this._router.navigate(["/create-host"])
  }
}
