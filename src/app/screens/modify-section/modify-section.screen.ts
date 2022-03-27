import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Section, Modifier, INVALID_VALUES, UNAUTHORISED_ACCESS, NOT_UNIQUE } from '@ticketing/angular';
import { EventManager } from '../../services/event.manager'

@Component({
  templateUrl: './modify-section.screen.html',
  styleUrls:['./modify-section.screen.scss']
})
export class ModifySectionScreen{
  public error: string;
  public modifierError: string;
  public sectionForm: FormGroup;

  public modifierForm: FormGroup;
  public modifiers: Array<Modifier>;
  public modifierFormShown: boolean;

  public activeModifier: Modifier;
  private _section: Section;

  constructor(private _ticketing: TickeTing, private _router: Router,
              private _eventManager: EventManager, private _activatedRoute: ActivatedRoute){
    this.error = "";

    this.sectionForm = new FormGroup({
      name: new FormControl(""),
      basePrice: new FormControl(""),
      salesStart: new FormControl(""),
      salesEnd: new FormControl(""),
      capacity: new FormControl(0),
      remaining: new FormControl(0),
      description: new FormControl("")
    })

    this.modifiers = [];
    this.modifierFormShown = false;
    this.activeModifier = null;

    this.modifierForm = new FormGroup({
      name: new FormControl(""),
      priceDelta: new FormControl(0),
      availableFrom: new FormControl(""),
      availableTo: new FormControl("")
    })
  }

  ngOnInit(){
    this._activatedRoute.params.subscribe(params => {
      this._ticketing.event.section.retrieve(atob(params.section)).then((section: any) => {
        this._section = section;
        this.modifiers = section.modifiers;
        this.sectionForm.setValue({
          name: section.name,
          basePrice: section.basePrice,
          salesStart: section.salesStart,
          salesEnd: section.salesEnd,
          capacity: section.capacity,
          remaining: section.remaining,
          description: section.description
        })
      }).catch((error: number) => {
        switch(error){
          case UNAUTHORISED_ACCESS:
            this.error = "You are not permitted to create sections."
            break;
          default:
            this.error = "The TickeTing server experienced an error. Please try again later."
        }
      })
    })
  }

  saveSection(){
    this.error = "";

    this._section.name = this.sectionForm.value.name
    this._section.basePrice = this.sectionForm.value.basePrice
    this._section.salesStart = this.sectionForm.value.salesStart
    this._section.salesEnd = this.sectionForm.value.salesEnd
    this._section.capacity = this.sectionForm.value.capacity
    this._section.remaining = this.sectionForm.value.remaining
    this._section.description = this.sectionForm.value.description

    this._section.save().then((success: boolean) => {
      if(success){
        this._router.navigate([`/events/${btoa(this._eventManager.getActiveEvent().self)}`]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create sections."
          break;
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        case NOT_UNIQUE:
          this.error = `Section '${this._section.name}' already exists for this event`
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  deleteSection(){
    this.error = "";

    this._section.delete().then((success: boolean) => {
      if(success){
        this._router.navigate([`/events/${btoa(this._eventManager.getActiveEvent().self)}`]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create sections."
          break;
        case NOT_UNIQUE:
          this.error = "A section cannot be deleted if tickets have already been reserved or sold."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  showModifierForm(modifier: Modifier){
    if(modifier){
      this.activeModifier = modifier
      this.modifierForm.setValue({
        name: modifier.name,
        priceDelta: modifier.priceDelta,
        availableFrom: modifier.availableFrom.replace(" ","T"),
        availableTo: modifier.availableTo.replace(" ","T")
      })
    }

    this.activeModifier
    this.modifierError = "";
    this.modifierFormShown = true;
  }

  saveModifier(){
    this.modifierError = "";

    let modifierPromise = null
    if(this.activeModifier){
      this.activeModifier.name = this.modifierForm.value.name
      this.activeModifier.priceDelta = this.modifierForm.value.priceDelta
      this.activeModifier.availableFrom = this.modifierForm.value.availableFrom.replace("T"," ")
      this.activeModifier.availableTo = this.modifierForm.value.availableTo.replace("T"," "),

      modifierPromise = this.activeModifier.save()
    }else{
      modifierPromise = this._section.addModifier({
        name:this.modifierForm.value.name,
        priceDelta:this.modifierForm.value.priceDelta,
        availableFrom:this.modifierForm.value.availableFrom.replace("T"," "),
        availableTo:this.modifierForm.value.availableTo.replace("T"," "),
        minOrder:0,
        maxOrder:0
      })
    }

    modifierPromise.then((modifier: Modifier) => {
      this._ticketing.event.section.retrieve(this._section.self).then((section: any) => {
        this.modifiers = section.modifiers;

        this.modifierForm.reset()
        this.modifierFormShown = false;
        this.activeModifier = null;
      })
    }).catch((error: number) => {
      switch(error){
        case INVALID_VALUES:
          this.modifierError = "Invalid values entered. Please review your values and try again."
          break;
        case NOT_UNIQUE:
          this.modifierError = "This event already has a "+this.sectionForm.value.name+" section."
          break;
        default:
          this.modifierError = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  deleteModifier(){
    this.modifierError = "";

    this.activeModifier.delete().then((success: boolean) => {
      if(success){
        this._ticketing.event.section.retrieve(this._section.self).then((section: any) => {
          this.modifiers = section.modifiers;

          this.modifierError = "";
          this.modifierForm.reset()
          this.modifierFormShown = false;
          this.activeModifier = null;
        })
      }else{
        this.modifierError = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.modifierError = "You are not permitted to delete modifiers."
          break;
        default:
          this.modifierError = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
