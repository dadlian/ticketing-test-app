import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Event, Section, Ticket, TickeTing } from '@ticketing/angular';

@Component({
  templateUrl: './redeem-tickets.screen.html',
  styleUrls:['./redeem-tickets.screen.scss']
})
export class RedeemTicketsScreen{
  public events: Array<Event>;
  public selectionForm: FormGroup;

  public event: Event;
  public section: Section;
  public tickets: Array<Ticket>;

  public status: string;
  public serial: string;

  constructor(private _ticketing: TickeTing){
    this.events = [];

    this.selectionForm = new FormGroup({
      event: new FormControl(""),
      section: new FormControl(""),
      serial: new FormControl("")
    })

    this.event = null;
    this.section = null;
    this.tickets = []

    this.status = "Issued";
    this.serial = "";
  }

  ngOnInit(){
    this._ticketing.event.upcoming().then(events => {
      for(let event of events){
        this.events.push(event);
      }
    }).catch((error: number) => {
      this.events.length = 0;
    })
  }

  changeEvent(){
    this.event = null
    this.section = null
    this.tickets.length = 0

    for(let event of this.events){
      if(event.self == this.selectionForm.value.event){
        this.event = event
        break
      }
    }
  }

  changeSection(){
    this.section = null

    if(this.event){
      for(let section of this.event.sections){
        if(section.self == this.selectionForm.value.section){
          this.section = section
          this._loadTickets()

          break
        }
      }
    }
  }

  searchTicket(){
    this.serial = this.selectionForm.value.serial

    let currentSerial = this.serial
    setTimeout(() => {
      if(currentSerial == this.serial){
        if(this.event && this.section){
          this._loadTickets()
        }
      }
    }, 500)
  }

  redeemTicket(ticket){
    if(this.status !== "Issued"){
      return
    }

    ticket.redeem().then(result => {
      this._loadTickets()
    }).catch(error => {
    })
  }

  setStatus(status: string){
    this.status = status
    this._loadTickets()
  }

  private _loadTickets(){
    this.tickets.length = 0
    this.section.getTickets(this.status, this.serial, 1, 20).then(tickets => {
      this.tickets = tickets
    })
  }
}
