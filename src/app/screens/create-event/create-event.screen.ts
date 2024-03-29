import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Host, Event, Venue, Category, INVALID_VALUES } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl: './create-event.screen.html',
  styleUrls:['./create-event.screen.scss']
})
export class CreateEventScreen{
  public host: Host;
  public error: string;
  public eventForm: FormGroup;
  public venues: Array<Venue>;
  public categories: Array<Category>;
  public subcategories: {[key: string]: Array<string>}

  private _banner: string;
  private _thumbnail: string;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing,
              private _router: Router, private _sessionManager: SessionManager){
    this.host = null;
    this.error = "";
    this._banner = "";
    this._thumbnail = "";
    this.subcategories = {"": []}

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
    this._ticketing.host.list(this._sessionManager.getActiveSession().account).then(hosts => {
      for(let host of hosts){
        if(host.name == this._activatedRoute.snapshot.params.host){
          this.host = host;
          break;
        }
      }
    })

    this._ticketing.event.venue.list().then(venues => {
      this.venues = venues
    })

    this._ticketing.event.category.list().then(categories => {
      this.categories = categories
      for(let category of this.categories){
        this.subcategories[category.self] = category.subcategories
      }
    })
  }

  createEvent(){
    this.error = "";

    this.host.createEvent({
      type: this.eventForm.value.type,
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      category: this.eventForm.value.category,
      subcategory: this.eventForm.value.subcategory,
      venue: this.eventForm.value.venue,
      start: this.eventForm.value.start.replace("T"," "),
      end: this.eventForm.value.end.replace("T"," "),
      public: this.eventForm.value.public?true:false,
      banner: this._banner,
      thumbnail: this._thumbnail,
      disclaimer:this.eventForm.value.disclaimer,
      tags:this.eventForm.value.tags.split(",")
    }).then((event: Event) => {
      this._router.navigate(["/hosts/"+this.host.name]);
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
