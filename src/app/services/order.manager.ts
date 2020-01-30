import { Injectable } from '@angular/core';
import { Order } from '@ticketing/angular';

@Injectable()
export class OrderManager{
  private _activeOrder: Order;

  constructor(){
    this._activeOrder = null;
  }

  setActiveOrder(order: Order){
    this._activeOrder = order;
  }

  getActiveOrder(){
    return this._activeOrder;
  }

  hasActiveOrder(): boolean{
    return this._activeOrder !== null;
  }
}
