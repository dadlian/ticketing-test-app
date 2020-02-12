import { Component } from '@angular/core';
import { Transfer } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';

@Component({
  templateUrl:'./transfer.screen.html',
  styleUrls:['./transfer.screen.scss']
})
export class TransferScreen{
  public transfers: Array<Transfer>;
  public filter: string;

  constructor(private _sessionManager: SessionManager){
    this.transfers = [];
    this.filter = "received";
  }

  ngOnInit(){
    this._loadTransfers();
  }

  filterTransfers(filter: string){
    this.filter = filter;
    this._loadTransfers();
  }

  claimTransfer(transfer: Transfer){
    transfer.claim();
    this._loadTransfers();
  }

  cancelTransfer(transfer: Transfer){
    transfer.cancel();
    this._loadTransfers();
  }

  private _loadTransfers(){
    this.transfers.length = 0;
    switch(this.filter){
      case "received":
        this._sessionManager.getActiveSession().account.listPendingTransferRequests().then(transfers => {
          this.transfers = transfers;
        })
        break;
      case "sent":
      default:
        this._sessionManager.getActiveSession().account.listPendingTransfersSent().then(transfers => {
          this.transfers = transfers;
        })
    }
  }
}
