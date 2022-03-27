import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Event, Section, INVALID_VALUES, NOT_UNIQUE } from '@ticketing/angular';

import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './create-section.screen.html',
  styleUrls:['./create-section.screen.scss']
})
export class CreateSectionScreen{
  public error: string;
  public sectionForm: FormGroup;

  private _event: Event;

  constructor(private _eventManager: EventManager, private _router: Router){
    this._event = null;
    this.error = "";

    this.sectionForm = new FormGroup({
      name: new FormControl(""),
      description: new FormControl(""),
      capacity: new FormControl(0),
      basePrice: new FormControl(0),
      salesStart: new FormControl(""),
      salesEnd: new FormControl("")
    })
  }

  ngOnInit(){
    this._event = this._eventManager.getActiveEvent();
  }

  createSection(){
    this.error = "";

    this._event.addSection({
      name: this.sectionForm.value.name,
      description: this.sectionForm.value.description,
      capacity: this.sectionForm.value.capacity,
      basePrice: this.sectionForm.value.basePrice,
      salesStart: this.sectionForm.value.salesStart.replace("T"," "),
      salesEnd: this.sectionForm.value.salesEnd.replace("T"," "),
      modifiers: []
    }).then((section: Section) => {
      this._router.navigate([`/events/${btoa(this._event.self)}`])
    }).catch((error: number) => {
      switch(error){
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        case NOT_UNIQUE:
          this.error = "This event already has a "+this.sectionForm.value.name+" section."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
