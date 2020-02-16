import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TickeTing, Event, Zone, Advertisement } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl:'./wallet.screen.html',
  styleUrls:['./wallet.screen.scss']
})
export class WalletScreen{
  public events: Array<Event>;
  public walletBanner: Zone;
  public walletAd: Advertisement;

  constructor(private _ticketing: TickeTing, private _sessionManager: SessionManager, private _eventManager: EventManager, private _router: Router){
    this.events = [];
    this.walletBanner = null;
    this.walletAd = null;
  }

  ngOnInit(){
    this._ticketing.event.attending(this._sessionManager.getActiveSession().account).then(events => {
      this.events = events;
    })

    this._ticketing.advertisement.findZone("WR4289").then(zone => {
      if(zone){
        this.walletBanner = zone;
        zone.getRandomAds(1).then(advertisements => {
          if(advertisements.length > 0){
            this.walletAd = advertisements[0];
          }
        })
      }
    })
  }

  selectEvent(event: Event){
    this._eventManager.setActiveEvent(event);
    this._router.navigate(['/tickets'])
  }

  purchaseEvent(event: Event){
    if(event){
      this._eventManager.setActiveEvent(event);
      this._router.navigate(['/order'])
    }
  }
}
