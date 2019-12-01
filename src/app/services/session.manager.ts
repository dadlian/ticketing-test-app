import { Injectable } from '@angular/core';
import { TickeTing, Session } from '@ticketing/angular';

@Injectable()
export class SessionManager{
  private _activeSession: Session;
  private _initialised: boolean;

  constructor(private _ticketing: TickeTing){
    this._activeSession = null;
    this._initialised = false;
  }

  login(identification: string, password: string): Promise<Session>{
    return new Promise((resolve, reject) => {
      this._ticketing.session.start(identification, password).then((session: Session) => {
        this._activeSession = session;
        localStorage.setItem("ticketing-test-app-session",session.key);

        resolve(session);
      }).catch((error: number) => {
        reject(error)
      })
    })
  }

  getActiveSession(){
    return this._activeSession;
  }

  hasActiveSession(): Promise<boolean>{
    return new Promise<boolean>((resolve)=>{
      if(this._activeSession){
        resolve(true)
      }else if (!this._initialised){
        resolve(this._initialise())
      }else{
        resolve(false)
      }
    })
  }

  logout(): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      if(!this._activeSession){
        resolve(false);
      }else{
        this._activeSession.end().then(result => {
          if(result){
            this._activeSession = null;
          }

          resolve(result);
        })
      }
    })
  }

  private _initialise(): Promise<boolean>{
    this._initialised = true;
    return new Promise((resolve, reject) => {
      this._ticketing.session.continue(localStorage.getItem("ticketing-test-app-session")).then((session: Session) => {
        this._activeSession = session;
        resolve(true)
      }).catch((error: number) => {
        resolve(false)
        reject(error)
      })
    })
  }
}
