import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Order, INVALID_STATE, INVALID_VALUES, SERVER_ERROR } from '@ticketing/angular';

import { OrderManager } from '../../services/order.manager';

@Component({
  templateUrl:"./payment.screen.html",
  styleUrls:["./payment.screen.scss"]
})
export class PaymentScreen{
  public order: Order;
  public error: string;
  public timeLeft: {minutes: number, seconds: number};
  public paymentForm: FormGroup;

  constructor(private _orderManager: OrderManager, private _router: Router){
    this.paymentForm = new FormGroup({
      cardholder: new FormControl(""),
      number: new FormControl(""),
      cvv: new FormControl(""),
      expiryDate: new FormControl(""),
      address1: new FormControl(""),
      address2: new FormControl(""),
      city: new FormControl(""),
      district: new FormControl(""),
      zip: new FormControl(""),
      country: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl("")
    })
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

  payForOrder(){
    this.error = "";

    this.order.pay({
      cardholder: this.paymentForm.value.cardholder,
      number: this.paymentForm.value.number,
      cvv: this.paymentForm.value.cvv,
      expiryDate: this.paymentForm.value.expiryDate,
      address1: this.paymentForm.value.address1,
      address2: this.paymentForm.value.address2,
      city: this.paymentForm.value.city,
      district: this.paymentForm.value.district,
      zip: this.paymentForm.value.zip,
      country: this.paymentForm.value.country,
      email:this.paymentForm.value.email,
      phone:this.paymentForm.value.phone
    }).then((result: boolean) => {
      this._router.navigate(["/home"]);
    }).catch((error: number) => {
      switch(error){
        case INVALID_VALUES:
          this.error = "Your details could not be used to pay for the order."
          break;
        case INVALID_STATE:
          this.error = "The order cannot be completed at this time. Please try again later."
          break;
        case SERVER_ERROR:
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
