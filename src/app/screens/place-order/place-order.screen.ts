import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event, Modifier, Order, INVALID_VALUES, INVALID_STATE } from '@ticketing/angular';

import { SessionManager } from '../../services/session.manager';
import { EventManager } from '../../services/event.manager';
import { OrderManager } from '../../services/order.manager';

@Component({
  templateUrl:"./place-order.screen.html",
  styleUrls:["./place-order.screen.scss"]
})
export class PlaceOrderScreen{
  public event: Event;
  public order: Order;
  public range: Array<number>;
  public selection: any;
  public error: string;
  public currentPrices: {[key: string]: {amount: number, availableFor: string, modifier: Modifier}}

  constructor(private _sessionManager: SessionManager, private _eventManager: EventManager, private _router: Router, private _orderManager: OrderManager){
    this.event = null;
    this.range = [0,1,2,3,4,5,6,7,8,9,10];
    this.selection = {};
    this.error = "";
    this.currentPrices = {}
  }

  ngOnInit(){
    this.order = this._sessionManager.getActiveSession().account.startOrder();
    this.event = this._eventManager.getActiveEvent();
    for(let section of this.event.sections){
      this.selection[section.id] = 0;
      this.currentPrices[section.id] = {amount: 0, availableFor: "", modifier: null}
    }

    this._loadCurrentPrices()
  }

  updateOrder(section){
    this.error = "";
    this.order.addItem(section,this.selection[section.id])

    this._loadCurrentPrices()
  }

  placeOrder(){
    this.order.place().then(result=>{
      this._orderManager.setActiveOrder(this.order);
      this._router.navigate(['/payment']);
    }).catch((error: number) => {
      switch(error){
        case INVALID_STATE:
          this.error = "The order cannot be submitted yet.";
          break;
        case INVALID_VALUES:
          this.error = "Your order could not be placed. Please review your selection."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  private _loadCurrentPrices(){
    for(let section of this.event.sections){
      section.getCurrentPrice(this.selection[section.id]).then(price => {
        this.currentPrices[section.id] = price
      })
    }
  }
}
