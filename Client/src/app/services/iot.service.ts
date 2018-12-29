import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { URL_IOTSERVER } from "../constants/urls";
import { alarmTimePeriodModel } from "../models/homeio/alarmModel";
import { lightDescriptionModel, lightModel } from "../models/homeio/lightModel";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IotService {

  public lightList$: BehaviorSubject<lightModel[]>;
  public lightDescriptionList$: BehaviorSubject<lightDescriptionModel[]>;
  public listAlarmPeriod$: BehaviorSubject<alarmTimePeriodModel[]>;
  public alarmState$: BehaviorSubject<boolean>;

  private route = "/notifications";

  constructor(private http: HttpClient) {
    this.lightList$ = new BehaviorSubject([]);
    this.lightDescriptionList$ = new BehaviorSubject([]);
    this.listAlarmPeriod$ = new BehaviorSubject([]);
  }


  public postLight(light: lightModel) {
    console.log(light);
    let apiUrl = URL_IOTSERVER + "/lightstate";
    return this.http.post(apiUrl, light, httpOptions);
  }

  //activer le système de sécurité
  public postAlarmTimePeriod(time: alarmTimePeriodModel) {
    return this.http.post(URL_IOTSERVER + "/alarm/timeperiod", time, httpOptions);
  }

  public getLightsDescription() {
    return this.http.get<lightDescriptionModel[]>(URL_IOTSERVER + "/homezone").subscribe((light) => this.lightDescriptionList$.next(light));
  }

  public postAllLights(toSend: boolean) {
    var state = 0;
    if (toSend)
      state = 1;

    // console.log(URL_IOTSERVER + "/light/all=" + (toSend ? true : false));
    return this.http.get(URL_IOTSERVER + "/light/all=" + state);
  }

  public getAlarmTimePeriod() {
    return this.http.get<alarmTimePeriodModel[]>(URL_IOTSERVER + '/alarm/timeperiod', httpOptions).subscribe((alarm) => this.listAlarmPeriod$.next(alarm));
  }

  public getAlarmState() {
    return this.http.get<boolean>(URL_IOTSERVER + "/alarm/info");
  }

  //désactiver le système de sécurité
  public alarmDisable() {
    return this.http.get(URL_IOTSERVER + "/disable/alarm");
  }

  //couper la sirène de l'alarme
  public cutAlarm(){
    return this.http.get(URL_IOTSERVER + "/cutalarm");
  }


  public smartLight(i: number) {
    return this.http.get<number>(URL_IOTSERVER + "/smartlight=" + i);
  }

}
