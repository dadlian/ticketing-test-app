import { Component } from '@angular/core';
import { Event, TickeTing } from '@ticketing/angular';

@Component({
  templateUrl: './sales-summary.screen.html',
  styleUrls:['./sales-summary.screen.scss']
})
export class SalesSummaryScreen{
  public events: Array<Event>
  public event: Event

  public summary: any
  public sections: Array<string>
  public modifiers: {[key: string]: Array<string>}

  constructor(private _ticketing: TickeTing){
    this.events = []
    this.event = null

    this.summary = {}
    this.sections = []
    this.modifiers = {}
  }

  ngOnInit(){
    this._ticketing.event.search("", 500, 1).then(events => {
      for(let event of events){
        this.events.push(event);
      }
    }).catch((error: number) => {
      this.events.length = 0;
    })
  }

  changeEvent(event: any){
    this.event = null
    let eventURI = event.target.value

    for(let event of this.events){
      if(event.self == eventURI){
        this.event = event
        break
      }
    }

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
