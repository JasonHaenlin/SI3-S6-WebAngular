import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { URL_SERVER } from "../constants/urls";
import { IncidentModel } from "../models/incident";



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class IncidentService {

  public incidentList$: BehaviorSubject<IncidentModel[]>;

  private route = "/incident";

  constructor(private http: HttpClient) {
    this.incidentList$ = new BehaviorSubject([]);
  }

  getIncident() {
    this.http.get<IncidentModel[]>(URL_SERVER + this.route).subscribe((incidents) => this.incidentList$.next(incidents));
  }

  deleteIncident(incident: IncidentModel | number): Observable<IncidentModel> {
    const id = typeof incident === 'number' ? incident : incident.id_incident;
    const url = `${this.route}/id=${id}`;
    return this.http.delete<IncidentModel>(URL_SERVER + url, httpOptions);
  }

  save(incident: IncidentModel) {
    console.log(incident);

    const url = `${this.route}/update/${incident.id_incident}`;
    console.log(URL_SERVER + url);
    return this.http.put<IncidentModel>(URL_SERVER + url, incident, httpOptions);
  }
}

