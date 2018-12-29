import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { URL_SERVER } from "../constants/urls";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CURRENT_USER } from '../constants/storage';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AuthentificationService {

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string) {
    return this.http.post<any>(URL_SERVER + '/auth', { username: username, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // should use a token to reinforce the security
          localStorage.setItem(CURRENT_USER, JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER);
  }

}
