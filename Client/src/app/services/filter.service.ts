import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL_SERVER } from '../constants/urls';
import { incidentStatesModel, userModel, criticiteModel, localisationModel } from '../models/incidentsModels';

@Injectable()
export class FilterService {

  // Observable source
  private updateChange = new BehaviorSubject<string>('');
  // Observable stream
  public updateChange$ = this.updateChange.asObservable();

  private incidentStates = new BehaviorSubject<incidentStatesModel[]>([]);
  public incidentStates$ = this.incidentStates.asObservable();

  private users = new BehaviorSubject<userModel[]>([]);
  public users$ = this.users.asObservable();

  private criticites = new BehaviorSubject<criticiteModel[]>([]);
  public criticites$ = this.criticites.asObservable();

  private localisation = new BehaviorSubject<localisationModel[]>([]);
  public localisation$ = this.localisation.asObservable();

  private lastFilterState: string = '';
  private filterState = new BehaviorSubject<string>('');
  public filterState$ = this.filterState.asObservable();

  private lastFilterCriticite: string = '';
  private filterCriticite = new BehaviorSubject<string>('');
  public filterCriticite$ = this.filterCriticite.asObservable();

  private lastFilterUser: string = '';
  private filterUser = new BehaviorSubject<string>('');
  public filterUser$ = this.filterUser.asObservable();

  private routeIncidentStates = '/incident/enum/avancement';
  private routeUsers = '/incident/enum/utilisateur';
  private routeCriticite = '/incident/enum/criticite';
  private routelocalisation = '/incident/enum/localisation';


  constructor(private http: HttpClient) {
  }

  // service command
  updateSearch(search) {
    this.updateChange.next(search);
  }

  getIncidentStates() {
    this.http.get<incidentStatesModel[]>(URL_SERVER + this.routeIncidentStates).subscribe((result) => this.incidentStates.next(result));
  }

  getLocalisation() {
    this.http.get<localisationModel[]>(URL_SERVER + this.routelocalisation).subscribe((result) => this.localisation.next(result));
  }

  getUsers() {
    this.http.get<userModel[]>(URL_SERVER + this.routeUsers).subscribe((result) => this.users.next(result));
  }

  getCriticites() {
    this.http.get<criticiteModel[]>(URL_SERVER + this.routeCriticite).subscribe((result) => this.criticites.next(result));
  }


  updateFilterEtat(filterState: string, event: any) {
    if (filterState != this.lastFilterState) {
      this.filterState.next(filterState);
      this.lastFilterState = filterState;
    } else {
      this.filterState.next('');
      this.lastFilterState = '';
      event.target.checked = false;
    }
    console.log(" Service " + filterState + " Variable last " + this.lastFilterState);
  }

  updateFilterCriticite(filterCriticite: string, event: any) {
    if (filterCriticite != this.lastFilterCriticite) {
      this.filterCriticite.next(filterCriticite);
      this.lastFilterCriticite = filterCriticite;
    } else {
      this.filterCriticite.next('');
      this.lastFilterCriticite = '';
      event.target.checked = false;
    }
  }

  updateFilterUser(filterUser: string, event: any) {
    if (filterUser != this.lastFilterUser) {
      this.filterUser.next(filterUser);
      this.lastFilterUser = filterUser;
    } else {
      this.filterUser.next('');
      this.lastFilterUser = '';
      event.target.checked = false;
    }
  }

  

}
