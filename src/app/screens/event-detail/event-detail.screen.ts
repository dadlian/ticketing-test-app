import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TickeTing, Event, Section, INVALID_VALUES, UNAUTHORISED_ACCESS } from '@ticketing/angular';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './event-detail.screen.html',
  styleUrls:['./event-detail.screen.scss']
})
export class EventDetailScreen{
  public error: string;
  public event: Event;
  public timestamp: number;

  constructor(private _router: Router, private _ticketing: TickeTing,
              private _activatedRoute: ActivatedRoute, private _eventManager: EventManager){
    this.event = null;
    this.error = "";
  }

  ngOnInit(){
    this._activatedRoute.params.subscribe(params => {
      this._ticketing.event.retrieve(atob(params.event)).then((event: any) => {
        this.event = event;
        this.timestamp = Date.now()
      })
    })
  }

  goBack(){
    let host = this._eventManager.getActiveHost()
    this._router.navigate([`/hosts/${host.name}`]);
  }

  editEvent(){
    this._router.navigate([`/events/${btoa(this.event.self)}/edit`])
  }

  submitEvent(){
    if(this.event.status !== 'Draft'){
      return;
    }

    this.event.submit().then(result => {
      if(result){
        this.event.status = 'Under Review'
      }
    }).catch((error: number) => {
      switch(error){
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        case UNAUTHORISED_ACCESS:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  modifySection(section: Section){
    this._router.navigate([`/events/${btoa(this.event.self)}/sections/${btoa(section.self)}`])
  }
}
