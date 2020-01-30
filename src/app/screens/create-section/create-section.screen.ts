import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Event, Section, Modifier, INVALID_VALUES, NOT_UNIQUE } from '@ticketing/angular';

import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './create-section.screen.html',
  styleUrls:['./create-section.screen.scss']
})
export class CreateSectionScreen{
  public error: string;
  public sectionForm: FormGroup;
  public modifierForm: FormGroup;
  public modifiers: Array<Modifier>;
  public modifierFormShown: boolean;

  private _event: Event;

  constructor(private _eventManager: EventManager){
    this.modifiers = [];
    this._event = null;
    this.error = "";
    this.modifierFormShown = false;

    this.sectionForm = new FormGroup({
      name: new FormControl(""),
      description: new FormControl(""),
      capacity: new FormControl(0),
      basePrice: new FormControl(0),
      salesStart: new FormControl(""),
      salesEnd: new FormControl("")
    })

    this.modifierForm = new FormGroup({
      name: new FormControl(""),
      priceDelta: new FormControl(0),
      quantity: new FormControl(0),
      availableFrom: new FormControl(""),
      availableTo: new FormControl("")
    })
  }

  ngOnInit(){
    this._event = this._eventManager.getActiveEvent();
  }

  showModifierForm(){
    this.modifierFormShown = true;
  }

  addModifier(){
    this.modifiers.push({
      name:this.modifierForm.value.name,
      priceDelta:this.modifierForm.value.priceDelta,
      availableFrom:this.modifierForm.value.availableFrom.replace("T"," "),
      availableTo:this.modifierForm.value.availableTo.replace("T"," "),
      minOrder:0,
      maxOrder:0
    })

    this.modifierForm.reset()
    this.modifierFormShown = false;
  }

  deleteModifier(index: number){
    let newModifiers = [];
    for(let i=0; i < this.modifiers.length; i++){
      if(index !== i){
        newModifiers.push(this.modifiers[i])
      }
    }

    this.modifiers = newModifiers;
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
      modifiers: this.modifiers
    }).then((section: Section) => {
      window.history.back();
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
