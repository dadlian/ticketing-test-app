import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event, Section, Transfer, INVALID_VALUES, INVALID_STATE } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl:"./send-transfer.screen.html",
  styleUrls:["./send-transfer.screen.scss"]
})
export class SendTransferScreen{
  public event: Event;
  public transfer: Transfer;
  public ranges: any;
  public selection: any;
  public error: string;

  constructor(private _sessionManager: SessionManager, private _eventManager: EventManager, private _router: Router){
    this.event = null;
    this.ranges = {};
    this.selection = {};
    this.error = "";
  }

  ngOnInit(){
    this.transfer = this._sessionManager.getActiveSession().account.startTransfer();
    this.event = this._eventManager.getActiveEvent();

    for(let section of this.event.sections){
      this.selection[section.id] = 0;
      this.ranges[section.id] = [0];
      this._sessionManager.getActiveSession().account.listWallet(section).then(tickets => {
        for(let i = 1; i <= tickets.length; i++){
          this.ranges[section.id].push(i);
        }
      });
    }
  }

  updateTransfer(section: Section){
    this.error = "";
    this.transfer.addItem(section,this.selection[section.id])
  }

  sendTransfer(){
    this.transfer.send({number: "AG-12D05DE4"}).then(result=>{
      this._router.navigate(['/tickets']);
    }).catch((error: number) => {
      switch(error){
        case INVALID_STATE:
          this.error = "The transfer cannot be sent as is.";
          break;
        case INVALID_VALUES:
          this.error = "Your transfer could not be sent. Please review your selection."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
