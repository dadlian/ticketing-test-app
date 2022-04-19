import { Component } from '@angular/core';
import { Host, Event, TickeTing } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './sales-summary.screen.html',
  styleUrls:['./sales-summary.screen.scss']
})
export class SalesSummaryScreen{
  public hosts: Array<Host>
  public host: Host
  public events: Array<Event>
  public event: Event

  public summary: any
  public sections: Array<string>
  public modifiers: {[key: string]: Array<string>}

  constructor(private _ticketing: TickeTing, private _sessionManager: SessionManager){
    this.hosts = []
    this.host = null
    this.events = []
    this.event = null

    this.summary = {}
    this.sections = []
    this.modifiers = {}
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

  changeHost(host: any){
    this.host = this.hosts[host.target.value]
    this.event = null
    this.events.length = 0

    this.host.events.then(events => {
      for(let event of events){
        this.events.push(event);
      }
    }).catch((error: number) => {
      this.events.length = 0;
    })
  }

  changeEvent(event: any){
    this.event = this.events[event.target.value]

    if(this.event){
      this.event.sales.then(summary => {
        this.summary = summary
        this.sections = Object.keys(this.summary.sections)
        for(let section of this.sections){
          this.modifiers[section] = Object.keys(this.summary.sections[section].modifiers)
        }
      })
    }
  }
}
