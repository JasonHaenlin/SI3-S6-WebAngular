import { Component, OnInit } from '@angular/core';
import { AvatarModel, UserInfoModel } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  private smarthome: string = "smartHome";

  public userList: UserInfoModel[] = [];
  public avatars: AvatarModel[] = [];
  url: string = "";
  subTitle: string = "Gestion des utilisateurs";

  constructor(private userService: UserService) {
    this.userService.userList$.subscribe(userList => (this.userList = userList));
    this.userService.avatars$.subscribe(avatars => (this.avatars = avatars));
    this.userService.getUserInfo();
    this.userService.getAvatars();
  }

  ngOnInit() {
    setTimeout(() => {
      this.userService.getUserInfo();
      this.userService.getAvatars();
    }, 250);
  }

  onModalClose() {
    this.ngOnInit();
  }

  onUserDeleted() {
    this.ngOnInit();
  }

}
