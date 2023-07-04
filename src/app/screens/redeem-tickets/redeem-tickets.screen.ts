import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Event, Section, Ticket, Digest, TickeTing } from '@ticketing/angular';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode'

import * as CryptoJS from 'crypto-js'

@Component({
  templateUrl: './redeem-tickets.screen.html',
  styleUrls:['./redeem-tickets.screen.scss']
})
export class RedeemTicketsScreen{
  @ViewChild("scanner", {static: false}) scanner: NgxScannerQrcodeComponent;

  public events: Array<Event>
  public selectionForm: FormGroup
  public sectionToggles: {[key: string]: boolean}

  public event: Event;
  public sections: Array<Section>;
  public tickets: Array<Ticket>;
  public counts: {[key: string]: number}
  public redeeming: boolean;
  public candidate: any

  public status: string;
  public serial: string;

  private _digest: Digest;

  constructor(private _ticketing: TickeTing){
    this.events = [];

    this.selectionForm = new FormGroup({
      event: new FormControl(""),
      section: new FormControl(""),
      serial: new FormControl("")
    })

    this.sectionToggles = {}
    this.event = null;
    this.sections = [];
    this.tickets = []
    this.counts = {}
    this._digest = null
    this.scanner = null;
    this.counts = {
      "Issued": 0,
      "Redeemed": 0,
      "Held": 0
    }

    this.status = "Issued";
    this.serial = "";

    this.redeeming = false;
    this.candidate = null;
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
    this.sections = []
    this.tickets.length = 0

    for(let event of this.events){
      if(event.self == this.selectionForm.value.event){
        this.event = event

        this.sectionToggles = {}
        for(let section of event.sections){
          this.sectionToggles[section.name] = false
        }

        break
      }
    }
  }

  toggleSection(section: Section){
    this.sectionToggles[section.name] = !this.sectionToggles[section.name]

    if(this.sectionToggles[section.name]){
      this.sections.push(section)
    }else{
      this.sections.splice(this.sections.indexOf(section), 1)
    }

    if(this.status == "Scan"){
      this.loadDigest()
    }

    this._loadCounts()
  }

  searchTicket(){
    this.serial = this.selectionForm.value.serial

    let currentSerial = this.serial
    setTimeout(() => {
      if(currentSerial == this.serial){
        if(this.event && this.sections.length > 0){
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
      this._loadCounts()
    }).catch(error => {
    })
  }

  redeemCandidate(){
    if(this.candidate.status !== "Issued"){
      return
    }

    this.candidate.redeem().then(result => {
      this.candidate.status = "Redeemed"
      this._loadCounts()
      this.loadDigest()
    }).catch(error => {
    })
  }

  setStatus(status: string){
    this.status = status
  }

  loadDigest(){
    this.status = "Scan"
    this.redeeming = false

    this.event.getDigest(this.sections).then(digest => {
      this._digest = digest
    })

    setTimeout(() => {
      this.scanner.start();
    }, 100)
  }

  scanTicket(code){
    if(code && !this.redeeming){
      this.scanner.stop();
      this.redeeming = true
      this.candidate = null

      let result = this._digest.validate(code)
      if(result){
        this.event.getTickets(
          result.status,
          result.serial,
          this.sections,
          1,
          1
        ).then(tickets => {
          this.candidate = tickets[0]
          this.candidate.status = result.status
        })
      }
    }
  }

  private _loadTickets(){
    this.tickets.length = 0

    this.event.getTickets(this.status, this.serial, this.sections, 1, 1).then(tickets => {
      this.tickets = this.tickets.concat(tickets)
    })
  }

  private _loadCounts(){
    //Load counts
    for(let status of ['Issued','Redeemed','Held']){
      this.counts[status] = 0

      this.event.countTickets(status, this.sections).then(count => {
        this.counts[status] += count;
      })
    }
  }
}
