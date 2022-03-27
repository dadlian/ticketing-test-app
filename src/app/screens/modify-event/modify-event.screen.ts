import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Event, Venue, Category, INVALID_VALUES, UNAUTHORISED_ACCESS, NOT_UNIQUE } from '@ticketing/angular';
import { EventManager } from '../../services/event.manager';

@Component({
  templateUrl: './modify-event.screen.html',
  styleUrls:['./modify-event.screen.scss']
})
export class ModifyEventScreen{
  public error: string;
  public eventForm: FormGroup;
  public venues: Array<Venue>;
  public categories: Array<Category>;
  public subcategories: {[key: string]: Array<string>}

  private _event: Event;
  private _banner: string;
  private _thumbnail: string;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing,
              private _router: Router, private _eventManager: EventManager){
    this.error = "";
    this.subcategories = {"": []}
    this._event = null;
    this._banner = "";
    this._thumbnail = "";

    this.eventForm = new FormGroup({
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
    this._activatedRoute.params.subscribe(params => {
      this._ticketing.event.retrieve(atob(params.event)).then((event: any) => {
        this._ticketing.event.venue.list().then(venues => {
          this.venues = venues

          this._ticketing.event.category.list().then(categories => {
            this.categories = categories
            for(let category of this.categories){
              this.subcategories[category.self] = category.subcategories
            }

            this._event = event;
            this.eventForm.setValue({
              type: this._event.type,
              title: this._event.title,
              description: this._event.description,
              category: this._event.category.self,
              subcategory: this._event.subcategory,
              venue: this._event.venue.self,
              start: this._event.start,
              end: this._event.end,
              public: this._event.public,
              disclaimer: this._event.disclaimer,
              tags: this._event.tags
            })
          })
        })
      })
    })
  }

  saveEvent(){
    this.error = "";

    this._event.type = this.eventForm.value.type
    this._event.title = this.eventForm.value.title
    this._event.description = this.eventForm.value.description
    this._event.category = this.eventForm.value.category
    this._event.subcategory = this.eventForm.value.subcategory
    this._event.venue = this.eventForm.value.venue
    this._event.start = this.eventForm.value.start.replace("T"," ")
    this._event.end = this.eventForm.value.end.replace("T"," ")
    this._event.public = this.eventForm.value.public?true:false
    this._event.banner = this._banner
    this._event.thumbnail = this._thumbnail
    this._event.disclaimer = this.eventForm.value.disclaimer
    this._event.tags = this.eventForm.value.tags.toString().split(",")

    this._event.save().then((success: boolean) => {
      if(success){
        this._router.navigate([`/events/${btoa(this._event.self)}`])
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
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

  deleteEvent(){
    this.error = "";

    this._event.delete().then((success: boolean) => {
      if(success){
        let host = this._eventManager.getActiveHost()
        this._router.navigate([`/hosts/${host.name}`]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create events."
          break;
        case NOT_UNIQUE:
          this.error = "You must delete all event sections before deleting an event."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  cacheBanner(event){
    let image = event.target.files[0];
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      this._banner = reader.result;
    }.bind(this), false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  cacheThumbnail(event){
    let image = event.target.files[0];
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      this._thumbnail = reader.result;
    }.bind(this), false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
