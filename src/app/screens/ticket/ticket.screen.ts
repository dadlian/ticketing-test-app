import { Component } from '@angular/core';
import { Event, Account } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './ticket.screen.html',
  styleUrls:['./ticket.screen.scss']
})
export class TicketScreen{
  public account: Account;
  public event: Event;
  public tickets: any;

  constructor(private _eventManager: EventManager, private _sessionManager: SessionManager){
    this.account = null;
    this.event = null;
    this.tickets = {};
  }

  ngOnInit(){
    this.account = this._sessionManager.getActiveSession().account;
    this.event = this._eventManager.getActiveEvent();

    for(let section of this.event.sections){
      this.account.listWallet(section).then(tickets => {
        this.tickets[section.id] = tickets;
      });
    }
  }
}
