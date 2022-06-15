import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Event, Section, Ticket, TickeTing } from '@ticketing/angular';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode'

import * as CryptoJS from 'crypto-js'

@Component({
  templateUrl: './redeem-tickets.screen.html',
  styleUrls:['./redeem-tickets.screen.scss']
})
export class RedeemTicketsScreen{
  @ViewChild("scanner", {static: false}) scanner: NgxScannerQrcodeComponent;

  public events: Array<Event>;
  public selectionForm: FormGroup;

  public event: Event;
  public section: Section;
  public tickets: Array<Ticket>;
  public counts: {[key: string]: number}
  public digest: Array<string>;

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
    this.counts = {}
    this.digest = []
    this.scanner = null;
    this.counts = {
      "Issued": 0,
      "Redeemed": 0,
      "Held": 0
    }

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

  loadDigest(){
    this.status = "Scan"
    this.digest.length = 0
    this.section.getDigest().then(digest => {
      for(let ticket of digest){
        let fingerprint = CryptoJS.SHA256(
          `${ticket.serial};${ticket.owner}`
        ).toString(CryptoJS.enc.Hex)

        this.digest[fingerprint] = ticket.serial
      }

      this.scanner.start();
    })
  }

  scanTicket(code){
    console.log(code)
  }

  private _loadTickets(){
    this.tickets.length = 0
    this.section.getTickets(this.status, this.serial, 1, 50).then(tickets => {
      this.tickets = tickets
    })

    //Load counts
    for(let status of ['Issued','Redeemed','Held']){
      this.section.countTickets(status).then(count => {
        this.counts[status] = count;
      })
    }
  }
}
