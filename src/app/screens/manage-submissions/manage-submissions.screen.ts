import { Component } from '@angular/core';
import { TickeTing, Event } from '@ticketing/angular';

@Component({
  templateUrl:'./manage-submissions.screen.html',
  styleUrls:['./manage-submissions.screen.scss']
})
export class ManageSubmissionsScreen{
  public submissions: Array<Event>;

  constructor(private _ticketing: TickeTing){
    this.submissions = [];
  }

  ngOnInit(){
    this._ticketing.event.submissions().then(submissions => {
      this.submissions = submissions;
    })
  }

  publish(event: Event){
    event.publish();

    let newSubmissions = [];
    for(let submission of this.submissions){
      if(submission !== event){
        newSubmissions.push(event)
      }
    }

    this.submissions = newSubmissions;
  }
}
