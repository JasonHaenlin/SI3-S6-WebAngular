import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from '../../../models/notification';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  @Input() incidentId: number;

  public notificationList: NotificationModel[] = [];

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    //sometimes there is no notifications so we need to fix the fact that we get a 400 response error
    this.notificationService.getNotifications(this.incidentId)
      .subscribe((data: NotificationModel[]) => this.notificationList = data,
        error => console.log(error)
      );
  }
}
