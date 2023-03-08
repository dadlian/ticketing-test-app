import { Component } from '@angular/core';
import { TickeTing, ActivitySummary, Account, Event, NOT_FOUND } from '@ticketing/angular';

@Component({
  templateUrl: './users.screen.html',
  styleUrls:['./users.screen.scss']
})
export class UsersScreen{
  public activity: ActivitySummary;
  public result: Account;
  public query: string;
  public message: string;
  public loading: boolean;
  public category: string;

  public events: Array<Event>;

  public filters: {
    sessions: {[key: string]: string},
    orders: {[key: string]: string},
    incoming: {[key: string]: string},
    outgoing: {[key: string]: string},
    tickets: {[key: string]: string}
  }

  constructor(private _ticketing: TickeTing){
    this.activity = null;
    this.result = null;
    this.query = "";
    this.message = "";
    this.loading = false;
    this.category = "";
    this.events = []

    this.filters = {
      sessions: {},
      orders: {},
      incoming: {},
      outgoing: {},
      tickets: {}
    }
  }

  ngOnInit(){
    this._ticketing.event.upcoming(1000, 1).then(events => {
      this.events = events;
    })
  }

  updateQuery(query){
    this.query = query.target.value;
  }

  search(user: string = ""){
    if(user){
      this.query = user
    }

    if(this.query && !this.loading){
      this.loading = true;
      this.activity = null
      this.category = "sessions"

      this._ticketing.account.findUser(this.query).then(account=> {
        this.result = account
        account.getActivity().then(activity => {
          this.activity = activity
          console.log(this.activity.account.activated)
        }).finally(() => {
          this.loading = false;
        })
      }).catch(error => {
        this.message = "There is no user matching your search"
        this.loading = false;
      })
    }
  }

  selectCategory(category: string){
    this.category = category;
  }

  getCategoryListing(){
    let listing = []

    switch(this.category){
      case "incoming":
        listing = this.activity.transfers.incoming
        break;
      case "outgoing":
        listing = this.activity.transfers.outgoing
        break;
      default:
        listing = this.activity[this.category]
        break;
    }

    let filteredListing = []
    let filters = this.filters[this.category]
    for(let entry of listing){
      if(Object.keys(filters).length){
        let match = true
        for(let filter in filters){
          if(this.category == "orders" && ["event","section"].indexOf(filter) > -1){
            for(let item of entry.items){
              if(filters[filter] && item[filter] != filters[filter]){
                match = false
              }
            }
          }else if(["incoming","outgoing"].indexOf(this.category) > -1 && ["event","section"].indexOf(filter) > -1){
            for(let ticket of entry.tickets){
              if(filters[filter] && ticket[filter] != filters[filter]){
                match = false
              }
            }
          }else if(["incoming","outgoing"].indexOf(this.category) > -1 && ["sender","recipient"].indexOf(filter) > -1){
            if(filters[filter] && entry[filter].username != filters[filter]){
              match = false
            }
          }else{
            if(filters[filter] && entry[filter].toString() != filters[filter]){
              match = false
            }
          }
        }

        if(match){
          filteredListing.push(entry)
        }
      }else{
        filteredListing.push(entry)
      }
    }

    return filteredListing
  }

  addFilter(name: string, value: any){
    this.filters[this.category][name] = value.target.value
  }

  toggleUser(){
    if(this.activity.account.activated){
      this.result.deactivate("Administrator deactivated account").then(success => {
        if(success){
          this.activity.account.activated = false
        }
      })

    }else{
      this.result.activate("Administrator reactivated account").then(success => {
        if(success){
          this.activity.account.activated = true
        }
      })
    }
  }
}
