import { Component } from '@angular/core';
import { Event } from '@ticketing/angular';

import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './event-detail.screen.html',
  styleUrls:['./event-detail.screen.scss']
})
export class EventDetailScreen{
  public event: Event;

  constructor(private _eventManager: EventManager){
    this.event = null;
  }

  ngOnInit(){
    this.event = this._eventManager.getActiveEvent();
  }

  goBack(){
    window.history.back();
  }

  submitEvent(){
    if(this.event.status !== 'Draft'){
      return;
    }
    
    this.event.submit().then(result => {
      if(result){
        this.event.status = 'Under Review'
      }
    })
  }
}
