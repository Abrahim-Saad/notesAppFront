import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiBaseURL = "https://routeegypt.herokuapp.com/"

  constructor(public _HttpClient: HttpClient) { }


  signUpApiService(accountData): Observable<any> {
    return this._HttpClient.post(this.apiBaseURL + 'signup', accountData)
  }

  signInApiService(userEmailAndPassword): Observable<any> {
    return this._HttpClient.post(this.apiBaseURL + 'signin', userEmailAndPassword)
  }

  signOut(data): Observable<any> {
    return this._HttpClient.post(this.apiBaseURL + 'signOut', data)
  }

  isLoggedIn() {
    return !!localStorage.getItem('TOKEN')

  }

}
 