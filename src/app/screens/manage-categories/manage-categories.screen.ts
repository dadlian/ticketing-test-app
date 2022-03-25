import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category, TickeTing } from '@ticketing/angular';

@Component({
  templateUrl: './manage-categories.screen.html',
  styleUrls:['./manage-categories.screen.scss']
})
export class ManageCategoriesScreen{
  public categories: Array<Category>;

  constructor(private _router: Router, private _ticketing: TickeTing){
    this.categories = [];
  }

  ngOnInit(){
    this._ticketing.event.category.list().then(categories => {
      for(let category of categories){
        this.categories.push(category);
      }
    }).catch((error: number) => {
      this.categories.length = 0;
    })
  }

  addCategory(){
    this._router.navigate(["/create-category"])
  }

  modifyCategory(category){
    this._router.navigate([`/modify-category/${btoa(category)}`])
  }
}
