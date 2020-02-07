import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TickeTing, Event } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl:'./wallet.screen.html',
  styleUrls:['./wallet.screen.scss']
})
export class WalletScreen{
  public events: Array<Event>;

  constructor(private _ticketing: TickeTing, private _sessionManager: SessionManager, private _eventManager: EventManager, private _router: Router){
    this.events = [];
  }

  ngOnInit(){
    this._ticketing.event.attending(this._sessionManager.getActiveSession().account).then(events => {
      this.events = events;
    })
  }

  selectEvent(event: Event){
    this._eventManager.setActiveEvent(event);
    this._router.navigate(['/tickets'])
  }
}
