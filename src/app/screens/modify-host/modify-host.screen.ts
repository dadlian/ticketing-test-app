import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Host, INVALID_VALUES, UNAUTHORISED_ACCESS, NOT_UNIQUE } from '@ticketing/angular';

@Component({
  templateUrl: './modify-host.screen.html',
  styleUrls:['./modify-host.screen.scss']
})
export class ModifyHostScreen{
  public error: string;
  public countries: Array<string>;
  public hostForm: FormGroup;

  private _host: Host;

  constructor(private _activatedRoute: ActivatedRoute, private _ticketing: TickeTing,
              private _router: Router){
    this.error = "";
    this._host = null;
    this.countries = [];

    this.hostForm = new FormGroup({
      name: new FormControl(""),
      description: new FormControl(""),
      contact: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      website: new FormControl(""),
      firstAddressLine: new FormControl(""),
      secondAddressLine: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      country: new FormControl("")
    })
  }

  ngOnInit(){
    this._activatedRoute.params.subscribe(params => {
      this._ticketing.host.retrieve(atob(params.host)).then((host: any) => {
        this._ticketing.system.countries().then(countries => {
          this.countries = countries

          this._host = host
          this.hostForm.setValue({
            name: this._host.name,
            description: this._host.description,
            contact: this._host.contact,
            email: this._host.email,
            phone: this._host.phone,
            website: this._host.website,
            firstAddressLine: this._host.firstAddressLine,
            secondAddressLine: this._host.secondAddressLine,
            city: this._host.city,
            state: this._host.state,
            country: this._host.country
          })
        })
      })
    })
  }

  saveEvent(){
    this.error = "";

    this._host.name = this.hostForm.value.name
    this._host.description = this.hostForm.value.description
    this._host.contact = this.hostForm.value.contact
    this._host.email = this.hostForm.value.email
    this._host.phone = this.hostForm.value.phone
    this._host.website = this.hostForm.value.website
    this._host.firstAddressLine = this.hostForm.value.firstAddressLine
    this._host.secondAddressLine = this.hostForm.value.secondAddressLine
    this._host.city = this.hostForm.value.city
    this._host.state = this.hostForm.value.state
    this._host.country = this.hostForm.value.country

    this._host.save().then((success: boolean) => {
      if(success){
        this._router.navigate([`/hosts/${btoa(this._host.self)}/events`])
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

    this._host.delete().then((success: boolean) => {
      if(success){
        this._router.navigate([`/hosts`]);
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
}
