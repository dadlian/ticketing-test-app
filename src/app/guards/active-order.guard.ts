import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { OrderManager } from '../services/order.manager';

@Injectable()
export class ActiveOrderGuard implements CanActivate, CanActivateChild{
  constructor(private _router: Router, private _orderManager: OrderManager){}

  canActivate(): Promise<boolean>{
    return new Promise((resolve)=>{
      if(this._orderManager.hasActiveOrder()){
        resolve(true)
      }else{
        this._router.navigate(["/order"]);
        resolve(false)
      }
    })
  }

  canActivateChild(): Promise<boolean>{
    return this.canActivate();
  }
}
