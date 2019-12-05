import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Event, INVALID_VALUES } from '@ticketing/angular';

import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './create-showing.screen.html',
  styleUrls:['./create-showing.screen.scss']
})
export class CreateShowingScreen{
  public error: string;
  public showingForm: FormGroup;
  private _event: Event;

  constructor(private _eventManager: EventManager){
    this._event = null;
    this.error = "";

    this.showingForm = new FormGroup({
      type: new FormControl(""),
      title: new FormControl(""),
      description: new FormControl(""),
      category: new FormControl(""),
      subcategory: new FormControl(""),
      venue: new FormControl(""),
      start: new FormControl(""),
      end: new FormControl(""),
      public: new FormControl(""),
      disclaimer: new FormControl(""),
      tags: new FormControl("")
    })
  }

  ngOnInit(){
    this._event = this._eventManager.getActiveEvent();
  }

  createShowing(){
    this.error = "";

    this._event.createShowing({
      type: this.showingForm.value.type,
      title: this.showingForm.value.title,
      description: this.showingForm.value.description,
      category: this.showingForm.value.category,
      subcategory: this.showingForm.value.subcategory,
      venue: {name: this.showingForm.value.venue},
      start: this.showingForm.value.start.replace("T"," "),
      end: this.showingForm.value.end.replace("T"," "),
      public: this.showingForm.value.public?true:false,
      disclaimer:this.showingForm.value.disclaimer,
      tags:this.showingForm.value.tags.split(",")
    }).then((showing: Event) => {
      window.history.back();
    }).catch((error: number) => {
      switch(error){
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
