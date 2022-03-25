import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TickeTing, Category, INVALID_VALUES, UNAUTHORISED_ACCESS, NOT_UNIQUE } from '@ticketing/angular';

@Component({
  templateUrl: './modify-category.screen.html',
  styleUrls:['./modify-category.screen.scss']
})
export class ModifyCategoryScreen{
  public error: string;
  public categoryForm: FormGroup;
  public subcategories: Array<string>;

  private _category: Category;

  constructor(private _ticketing: TickeTing, private _router: Router, private _activatedRoute: ActivatedRoute){
    this.error = "";
    this.subcategories = []

    this.categoryForm = new FormGroup({
      name: new FormControl("")
    })
  }

  ngOnInit(){
    this._activatedRoute.params.subscribe(params => {
      this._ticketing.event.category.retrieve(atob(params.category)).then((category: any) => {
        this._category = category;
        this.categoryForm.setValue({
          name: category.name
        })

        this.subcategories = Array.isArray(category.subcategories)?category.subcategories:[]
      }).catch((error: number) => {
        switch(error){
          case UNAUTHORISED_ACCESS:
            this.error = "You are not permitted to create categories."
            break;
          default:
            this.error = "The TickeTing server experienced an error. Please try again later."
        }
      })
    })
  }

  addSubcategory(){
    this.subcategories.push("")
  }

  removeSubcategory(i){
    this.subcategories.splice(i,1)
  }

  saveCategory(){
    this.error = "";

    this._category.name = this.categoryForm.value.name
    this._category.subcategories = this.subcategories

    this._category.save().then((success: boolean) => {
      if(success){
        this._router.navigate(["/categories"]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to manage categories."
          break;
        case INVALID_VALUES:
          this.error = "Invalid values entered. Please review your values and try again."
          break;
        case NOT_UNIQUE:
          this.error = `Event category '${this._category.name}' already exists.`
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }

  deleteCategory(){
    this.error = "";

    this._category.delete().then((success: boolean) => {
      if(success){
        this._router.navigate(["/categories"]);
      }else{
        this.error = "The TickeTing server experienced an error. Please try again later."
      }
    }).catch((error: number) => {
      switch(error){
        case UNAUTHORISED_ACCESS:
          this.error = "You are not permitted to delete categories."
          break;
        default:
          this.error = "The TickeTing server experienced an error. Please try again later."
      }
    })
  }
}
