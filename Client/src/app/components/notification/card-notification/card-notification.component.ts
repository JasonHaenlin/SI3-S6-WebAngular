import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from '../../../models/notification';
import { Target } from '../../../models/target';
import { NotificationService } from '../../../services/notification.service';



@Component({
  selector: 'app-card-notification',
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.css']
})

export class CardNotificationComponent implements OnInit {

  @Input() notification: NotificationModel;
  public targets: Target[] = [];
  public auteur: string;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    console.log("init card notification")
    this.auteur = this.getSelectedUserNameForNotification();
    this.getNotificationTargets();
  }

  public getNotificationTargets() {
    console.log("notif id =" + this.notification.id_notification);
    //this.notificationService.targets$.subscribe(targets => (this.targets=targets));
    this.notificationService.getNotificationTargets(this.notification.id_notification)
      .subscribe((data: Target[]) => this.targets = data);
  }

  public getSelectedUserNameForNotification(): string {
    let result = localStorage.getItem("session")
    let session = JSON.parse(result);

    if (session["name"] == this.notification.auteur) {
      return "vous";
    } else {
      return this.notification.auteur;
    }
  }

  log(val) { console.log(val); }


}
