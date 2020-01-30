import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order, INVALID_STATE } from '@ticketing/angular';

import { OrderManager } from '../../services/order.manager';

@Component({
  templateUrl:"./payment.screen.html",
  styleUrls:["./payment.screen.scss"]
})
export class PaymentScreen{
  public order: Order;
  public error: string;
  public timeLeft: {minutes: number, seconds: number};

  constructor(private _orderManager: OrderManager, private _router: Router){
  }

  ngOnInit(){
    this.order = this._orderManager.getActiveOrder();
    this.error = "";
    this._getTimeLeft();
  }

  cancelOrder(){
    this.order.cancel().then(result => {
      this._router.navigate(["/order"]);
    }).catch((error: number) => {
      switch(error){
        case INVALID_STATE:
          this.error = "The order cannot be cancelled at this time."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  private _getTimeLeft(){
    this.timeLeft = this.order.getTimeLeft()

    setTimeout(() => {
      this._getTimeLeft()
    },1000)
  }
}
