import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Category, INVALID_VALUES, UNAUTHORISED_ACCESS, NOT_UNIQUE } from '@ticketing/angular';

@Component({
  templateUrl: './create-category.screen.html',
  styleUrls:['./create-category.screen.scss']
})
export class CreateCategoryScreen{
  public error: string;
  public categoryForm: FormGroup;
  public subcategories: Array<string>;

  constructor(private _ticketing: TickeTing, private _router: Router){
    this.error = "";
    this.subcategories = []

    this.categoryForm = new FormGroup({
      name: new FormControl("")
    })
  }

  addSubcategory(){
    this.subcategories.push("")
  }

  removeSubcategory(i){
    this.subcategories.splice(i,1)
  }

  createCategory(){
    this.error = "";

    this._ticketing.event.category.create({
      name: this.categoryForm.value.name,
      subcategories: this.subcategories
    }).then((category: Category) => {
      this._router.navigate(["/categories"]);
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to create categories."
          break;
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        case NOT_UNIQUE:
          this.error = "You have already created this event category."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
