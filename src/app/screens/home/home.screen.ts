import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TickeTing, Event } from '@ticketing/angular';

import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl:'./home.screen.html',
  styleUrls:['./home.screen.scss']
})
export class HomeScreen{
  public events: Array<Event>;
  public filter: string;
  public search: string;

  constructor(private _ticketing: TickeTing, private _eventManager: EventManager, private _router: Router){
    this.events = [];
    this.filter = "upcoming";
    this.search = "";
  }

  ngOnInit(){
    this._loadEvents();
  }

  searchEvents(){
    this.filter = "";
    this._ticketing.event.search(this.search).then(events => {
      this.events = events;
    })
  }

  filterEvents(filter: string){
    this.search = "";
    this.filter = filter;
    this._loadEvents();
  }

  selectEvent(event: Event){
    this._eventManager.setActiveEvent(event);
    this._router.navigate(['/order'])
  }

  private _loadEvents(){
    switch(this.filter){
      case "popular":
        this._ticketing.event.popular().then(events => {
          this.events = events;
        })
        break;
      case "new":
        this._ticketing.event.new().then(events => {
          this.events = events;
        })
        break;
      case "upcoming":
      default:
        this._ticketing.event.upcoming().then(events => {
          this.events = events;
        })
    }
  }
}
