import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { URL_SERVER } from "../constants/urls";
import { NotificationModel } from '../models/notification';
import { Target } from '../models/Target';





const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NotificationService {
  public notificationList$: BehaviorSubject<NotificationModel[]>;
  public targets$: BehaviorSubject<Target[]>;

  private route = "/notifications";

  constructor(private http: HttpClient) {
    this.notificationList$ = new BehaviorSubject([]);
    this.targets$ = new BehaviorSubject([]);
  }

  getNotifications(id_incident: number) {
    let apiUrl = URL_SERVER + this.route + "/incident=" + id_incident
    return this.http.get<NotificationModel[]>(apiUrl);
    /*.subscribe((notification) => {
      console.log("Service :");
      console.log(notification);
      this.notificationList$.next(notification);
    });*/
  }

  public getNotificationTargets(id_notification: number) {
    let apiUrl = URL_SERVER + this.route + "/notification=" + id_notification;
    return this.http.get<Target[]>(apiUrl);
    //.subscribe((target) => this.targets$.next(target));
  }

  public addNotification(notification: NotificationModel) {
    let apiUrl = URL_SERVER + this.route + "/add";
    return this.http.post(apiUrl, notification, httpOptions);
  }

  public addNotificationTargets(notification: NotificationModel) {
    let apiUrl = URL_SERVER + this.route + "/addtargets";
    return this.http.post(apiUrl, notification, httpOptions);
  }



}
